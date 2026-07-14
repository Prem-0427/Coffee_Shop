// ===============================
// Coffee Shop Signup
// ===============================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    const successBox = document.getElementById("signupSuccess");

    signupForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("signupConfirm").value;

        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {

            const response = await fetch(
                "https://coffee-shop-uiom.onrender.com/api/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

                successBox.textContent = "Account Created Successfully";
                successBox.classList.add("show");

                setTimeout(() => {

                    window.location.href = "login.html";

                }, 1000);

            } else {

                alert(data.message);

            }

        } catch (err) {

            console.log(err);

            alert("Unable to connect to server.");

        }

    });

}