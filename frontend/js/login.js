const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("http://localhost:3000/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("token", data.token);

            localStorage.setItem("user", JSON.stringify(data.user));

            window.location.href = "index.html";

        } else {

            document.getElementById("mensaje").innerText = data.message;

        }

    } catch (error) {

        document.getElementById("mensaje").innerText =
            "Error al conectar con el servidor";

    }

});