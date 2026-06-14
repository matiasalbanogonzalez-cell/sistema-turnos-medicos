const API = "http://localhost:3000/api";
const token = localStorage.getItem("token");
const storedUser = JSON.parse(localStorage.getItem("user") || "null");

if (!token || !storedUser) {
    window.location.href = "login.html";
}

function cargarPerfil() {
    document.getElementById("nombre").textContent = storedUser.nombre || "";
    document.getElementById("email").textContent = storedUser.email || "";
    document.getElementById("rol").textContent = storedUser.rol || storedUser.role || "";
}

async function cargarTurnos() {
    try {
        const res = await fetch(`${API}/turnos`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!res.ok) {
            throw new Error("No se pudieron cargar los turnos");
        }

        const turnos = await res.json();

        const container = document.getElementById("turnos");
        container.innerHTML = "";

        if (!turnos.length) {
            container.innerHTML = "<p>No tienes turnos aún.</p>";
            return;
        }

        turnos.forEach(t => {
            const div = document.createElement("div");
            div.className = "turno";

            div.innerHTML = `
                <p><strong>Fecha:</strong> ${t.fecha}</p>
                <p><strong>Hora:</strong> ${t.hora}</p>
                <p><strong>Estado:</strong> ${t.estado || "pendiente"}</p>
            `;

            container.appendChild(div);
        });
    } catch (error) {
        const container = document.getElementById("turnos");
        container.innerHTML = `<p>${error.message}</p>`;
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

cargarPerfil();
cargarTurnos();