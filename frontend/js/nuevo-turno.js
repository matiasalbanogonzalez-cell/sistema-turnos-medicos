const API = "http://localhost:3000/api";
const token = localStorage.getItem("token");
const storedUser = JSON.parse(localStorage.getItem("user") || "null");

if (!token || !storedUser) {
    window.location.href = "login.html";
}

const especialidadSelect = document.getElementById("especialidad");
const profesionalSelect = document.getElementById("profesional");

let profesionalesData = [];

function obtenerPaciente() {
    const user = storedUser;
    if (user && (user.nombre || user.apellido)) {
        return `${user.nombre || ""} ${user.apellido || ""}`.trim();
    }
    return user?.email || "Paciente";
}

async function cargarEspecialidades() {
    try {
        const res = await fetch(`${API}/profesionales`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!res.ok) {
            throw new Error("No se pudieron cargar profesionales");
        }

        const data = await res.json();
        if (!Array.isArray(data)) {
            throw new Error('Formato de profesionales inválido');
        }

        profesionalesData = data;

        // Normalizar y obtener especialidades únicas, filtrando valores vacíos
        const especialidadesRaw = data.map(p => {
            if (p.especialidad) return p.especialidad;
            if (Array.isArray(p.especialidades) && p.especialidades.length) return p.especialidades[0];
            return null;
        });

        const especialidades = [...new Set(especialidadesRaw.map(s => s && String(s).trim()).filter(Boolean))];

        especialidadSelect.innerHTML = '<option value="">Selecciona una especialidad</option>';
        profesionalSelect.innerHTML = '<option value="">Selecciona una especialidad primero</option>';

        if (especialidades.length === 0) {
            especialidadSelect.innerHTML = '<option value="">No se encontraron especialidades</option>';
            return;
        }

        especialidades.forEach(esp => {
            const option = document.createElement("option");
            option.value = esp;
            option.textContent = esp;
            especialidadSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error cargando especialidades:", error);
        especialidadSelect.innerHTML = "<option value=''>Error al cargar especialidades</option>";
        profesionalSelect.innerHTML = "<option value=''>Error al cargar profesionales</option>";
    }
}

function filtrarProfesionalesPorEspecialidad() {
    const especialidadSeleccionada = especialidadSelect.value;

    profesionalSelect.innerHTML = "";

    if (!especialidadSeleccionada) {
        profesionalSelect.innerHTML = '<option value="">Selecciona una especialidad primero</option>';
        return;
    }

    const profesionales = profesionalesData.filter(p => p.especialidad === especialidadSeleccionada);

    if (profesionales.length === 0) {
        profesionalSelect.innerHTML = "<option value=''>No hay profesionales en esta especialidad</option>";
        return;
    }

    profesionales.forEach(p => {
        const option = document.createElement("option");
        option.value = p._id || p.id;
        option.textContent = p.nombre;
        option.dataset.especialidad = p.especialidad;
        profesionalSelect.appendChild(option);
    });
}

especialidadSelect.addEventListener("change", filtrarProfesionalesPorEspecialidad);

document.getElementById("guardar").addEventListener("click", async () => {
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;

    if (!fecha || !hora || !profesionalSelect.value) {
        alert("Completa todos los campos antes de guardar el turno.");
        return;
    }

    const turno = {
        paciente: obtenerPaciente(),
        profesionalId: profesionalSelect.value,
        especialidad: profesionalSelect.selectedOptions[0]?.dataset.especialidad || "",
        fecha,
        hora
    };

    const res = await fetch(`${API}/turnos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(turno)
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.message || "Error al crear el turno");
        return;
    }

    alert(data.message || "Turno creado");
    window.location.href = "turnos.html";
});

cargarEspecialidades();
