const API = "http://localhost:3000/api";
const token = localStorage.getItem("token");

// Decodificar token simple (sin librerías)
function parseJwt(token) {
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1]));
}

function cargarPerfil() {
    const data = parseJwt(token);

    if (!data) return;

    document.getElementById("nombre").textContent = data.email;
    document.getElementById("email").textContent = data.email;
    document.getElementById("rol").textContent = data.role || data.rol;
}

async function cargarTurnos() {
    const res = await fetch(`${API}/turnos`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const turnos = await res.json();

    const container = document.getElementById("turnos");
    container.innerHTML = "";

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
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

cargarPerfil();
cargarTurnos();