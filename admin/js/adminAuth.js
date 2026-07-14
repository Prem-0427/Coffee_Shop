// =========================================
// Coffee Co. Admin Authentication
// =========================================

const API_URL = "http://localhost:5000/api/admin";

const loginForm = document.getElementById("adminLoginForm");
const errorBox = document.getElementById("error");

const adminToken = localStorage.getItem("adminToken");

// Redirect ONLY if we are on login page
if (window.location.pathname.includes("login.html") && adminToken) {
    window.location.href = "dashboard.html";
}

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        errorBox.textContent = "";

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        try {

            const response = await fetch(`${API_URL}/login`, {

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

            if (!response.ok) {

                errorBox.textContent = data.message;

                return;

            }

            localStorage.setItem("adminToken", data.token);
            localStorage.setItem("admin", JSON.stringify(data.admin));

            alert("Login Successful");

            window.location.href = "dashboard.html";

        } catch (err) {

            console.log(err);

            errorBox.textContent = "Unable to connect to server.";

        }

    });

}

// Logout
function adminLogout() {

    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    window.location.href = "login.html";

}