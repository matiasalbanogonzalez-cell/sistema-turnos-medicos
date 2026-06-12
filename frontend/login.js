const API = "http://localhost:3000/api";

let token = "";

// 🔐 LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    document.getElementById("msg").innerText = data.message;
    return;
  }

  token = data.token;
  localStorage.setItem("token", token);

  document.getElementById("msg").innerText =
    "Login OK 👌 Bienvenido " + data.user.nombre;
}

// 📅 VER TURNOS
async function getTurnos() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/turnos`, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();

  document.getElementById("output").innerText =
    JSON.stringify(data, null, 2);
}
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    document.getElementById("msg").innerText = data.message;
    return;
  }

  // guardar token
  localStorage.setItem("token", data.token);

  // 🔥 REDIRECCIÓN
  window.location.href = "dashboard.html";
}