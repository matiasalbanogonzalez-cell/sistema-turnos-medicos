const API = "http://localhost:3000/api";
const token = localStorage.getItem("token");
const storedUser = JSON.parse(localStorage.getItem("user") || "null");

const especialidadSelect = document.getElementById("especialidad");
const profesionalSelect = document.getElementById("profesional");

function obtenerPaciente() {
    const user = storedUser;
    if (user && (user.nombre || user.apellido)) {
        return `${user.nombre || ""} ${user.apellido || ""}`.trim();
    }
    return user?.email || "Paciente";
}

async function cargarProfesionales() {
    const res = await fetch(`${API}/profesionales`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const data = await res.json();

    profesionalSelect.innerHTML = "";

    data.forEach(p => {
        const option = document.createElement("option");
        option.value = p._id || p.id;
        option.textContent = p.nombre + " - " + p.especialidad;
        option.dataset.especialidad = p.especialidad;
        profesionalSelect.appendChild(option);
    });
}

document.getElementById("guardar").addEventListener("click", async () => {

    const turno = {
        paciente: obtenerPaciente(),
        profesionalId: profesionalSelect.value,
        especialidad: profesionalSelect.selectedOptions[0]?.dataset.especialidad || "",
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value
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

    alert(data.message || "Turno creado");
});

cargarProfesionales();