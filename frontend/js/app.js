const usuario = JSON.parse(localStorage.getItem("user"));

if (!usuario) {

    window.location.href = "login.html";

}

document.querySelector(".usuario span").textContent =
    usuario.nombre + " " + usuario.apellido;

// Datos temporales
document.getElementById("cantProfesionales").textContent = 8;
document.getElementById("cantTurnos").textContent = 24;
document.getElementById("cantPacientes").textContent = 15;

const turnos = [

    {
        paciente: "Juan Pérez",
        profesional: "Dr. Gómez",
        fecha: "15/06/2026",
        estado: "Confirmado"
    },

    {
        paciente: "Ana López",
        profesional: "Dra. Ruiz",
        fecha: "16/06/2026",
        estado: "Pendiente"
    }

];

const tabla = document.getElementById("tablaTurnos");

turnos.forEach(t => {

    tabla.innerHTML += `

        <tr>

            <td>${t.paciente}</td>

            <td>${t.profesional}</td>

            <td>${t.fecha}</td>

            <td>${t.estado}</td>

        </tr>

    `;

});
function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";

}