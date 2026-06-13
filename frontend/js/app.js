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

document.getElementById("cantProfesionales").textContent = 8;
document.getElementById("cantTurnos").textContent = 24;
document.getElementById("cantPacientes").textContent = 15;