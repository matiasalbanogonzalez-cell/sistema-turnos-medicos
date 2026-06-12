const API = "http://localhost:3000/api";

// 🔐 PROTECCIÓN
if (!localStorage.getItem("token")) {
  window.location.href = "index.html";
}

// 📅 OBTENER TURNOS
async function getTurnos() {
  const res = await fetch(`${API}/turnos`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  const turnos = await res.json();

  const container = document.getElementById("turnos");
  container.innerHTML = "";

  turnos.forEach(t => {
    const div = document.createElement("div");

    div.style.border = "1px solid #ccc";
    div.style.margin = "10px";
    div.style.padding = "10px";

    div.innerHTML = `
      <p><b>Paciente:</b> ${t.nombrePaciente || "Sin nombre"}</p>
      <p><b>Estado:</b> ${t.estado || "pendiente"}</p>

      <button onclick="cambiarEstado('${t._id}', 'confirmado')">
        Confirmar
      </button>

      <button onclick="cambiarEstado('${t._id}', 'cancelado')">
        Cancelar
      </button>
    `;

    container.appendChild(div);
  });
}

// 🔄 CAMBIAR ESTADO (BOTONES REALES)
async function cambiarEstado(id, estado) {
  const res = await fetch(`${API}/turnos/${id}/estado`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ estado })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Estado actualizado ✔");
    getTurnos(); // recargar lista
  } else {
    alert(data.message || "Error");
  }
}

// 🚪 LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}