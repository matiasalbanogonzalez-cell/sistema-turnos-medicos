const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const usuario = {

        nombre: document.getElementById("nombre").value,

        apellido: document.getElementById("apellido").value,

        email: document.getElementById("email").value,

        password: document.getElementById("password").value

    };

    try {

        const response = await fetch(
            "http://localhost:3000/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Usuario registrado correctamente");

            window.location.href = "login.html";

        } else {

            document.getElementById("mensaje").innerText =
                data.message || "Error al registrar";

        }

    } catch (error) {

        document.getElementById("mensaje").innerText =
            "Error de conexión con el servidor";

    }

});