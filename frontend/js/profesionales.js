const API = "http://localhost:3000/api";
const token = localStorage.getItem("token");
const usuario = JSON.parse(localStorage.getItem("user") || "null");

if (!token || !usuario) {
  window.location.href = "login.html";
}

async function cargarProfesionales() {
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

    const tabla = document.getElementById("tablaProfesionales");
    tabla.innerHTML = "";

    data.forEach(p => {
      tabla.innerHTML += `
        <tr>
          <td>${p.nombre}</td>
          <td>${p.especialidad}</td>
          <td>${p.matricula}</td>
          <td>${p.consultorio}</td>
          <td>
            <button onclick="editar('${p.id}')">✏️</button>
            <button onclick="eliminar('${p.id}')">🗑️</button>
          </td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error cargando profesionales:", error);
  }
}

// botones (por ahora demo)
function editar(id) {
  alert("Editar profesional: " + id);
}

function eliminar(id) {
  alert("Eliminar profesional: " + id);
}

// cargar al abrir la página
cargarProfesionales();

if (usuario) {
  document.getElementById("nombreUsuario").innerText =
    `${usuario.nombre || ""} ${usuario.apellido || ""}`.trim();
}

// logout
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}