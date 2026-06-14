const API = "http://localhost:3000/api";
const usuario = JSON.parse(localStorage.getItem("user") || "null");
const token = localStorage.getItem("token");

if (!usuario || !token) {
    window.location.href = "login.html";
}

const nombreUsuario = document.querySelector(".usuario span");
const cantProfesionales = document.getElementById("cantProfesionales");
const cantTurnos = document.getElementById("cantTurnos");
const cantPacientes = document.getElementById("cantPacientes");
const tabla = document.getElementById("tablaTurnos");

if (nombreUsuario) {
    nombreUsuario.textContent = `${usuario.nombre || ""} ${usuario.apellido || ""}`.trim();
}

async function cargarDashboard() {
    try {
        const [profRes, turnoRes] = await Promise.all([
            fetch(`${API}/profesionales`, { headers: { Authorization: "Bearer " + token } }),
            fetch(`${API}/turnos`, { headers: { Authorization: "Bearer " + token } })
        ]);

        if (!profRes.ok) {
            throw new Error("No se pudieron cargar los profesionales");
        }
        if (!turnoRes.ok) {
            throw new Error("No se pudieron cargar los turnos");
        }

        const profesionales = await profRes.json();
        const turnos = await turnoRes.json();

        if (cantProfesionales) {
            cantProfesionales.textContent = profesionales.length;
        }

        if (cantTurnos) {
            cantTurnos.textContent = turnos.length;
        }

        if (cantPacientes) {
            const pacientes = new Set(turnos.map(t => t.paciente)).size;
            cantPacientes.textContent = pacientes;
        }

        if (tabla) {
            tabla.innerHTML = "";

            if (!turnos.length) {
                tabla.innerHTML = `
                    <tr>
                        <td colspan="5">No hay turnos registrados</td>
                    </tr>`;
                return;
            }

            turnos.slice(-5).reverse().forEach(t => {
                tabla.innerHTML += `
                    <tr>
                        <td>${t.paciente}</td>
                        <td>${t.especialidad || "Sin especialidad"}</td>
                        <td>${t.fecha}</td>
                        <td>${t.hora || "Sin hora"}</td>
                        <td>${t.estado || "pendiente"}</td>
                    </tr>`;
            });
        }
    } catch (error) {
        console.error(error);
        if (tabla) {
            tabla.innerHTML = `
                <tr>
                    <td colspan="4">${error.message}</td>
                </tr>`;
        }
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

cargarDashboard();
