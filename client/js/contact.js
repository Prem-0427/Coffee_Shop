// ===============================
// Contact Form
// ===============================

(function () {

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const form = document.getElementById("contactForm");

    if (!form) return;

    const successBox = document.getElementById("contactSuccess");

    function setFieldError(field, message) {

        field.classList.add("has-error");

        field.querySelector(".error-msg").textContent = message;

    }

    function clearFieldError(field) {

        field.classList.remove("has-error");

        field.querySelector(".error-msg").textContent = "";

    }

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const nameField = document.getElementById("contactNameField");
        const emailField = document.getElementById("contactEmailField");
        const msgField = document.getElementById("contactMessageField");

        const name = document.getElementById("contactName");
        const email = document.getElementById("contactEmail");
        const message = document.getElementById("contactMessage");

        let ok = true;

        if (name.value.trim().length < 2) {

            setFieldError(nameField, "Enter your name.");

            ok = false;

        } else {

            clearFieldError(nameField);

        }

        if (!EMAIL_RE.test(email.value.trim())) {

            setFieldError(emailField, "Enter a valid email.");

            ok = false;

        } else {

            clearFieldError(emailField);

        }

        if (message.value.trim().length < 5) {

            setFieldError(msgField, "Please enter your message.");

            ok = false;

        } else {

            clearFieldError(msgField);

        }

        if (!ok) return;

        try {

            const response = await fetch("http://localhost:5000/api/contact", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    name: name.value.trim(),

                    email: email.value.trim(),

                    subject: "Coffee Website Contact",

                    message: message.value.trim()

                })

            });

            const data = await response.json();

            if (data.success) {

                successBox.textContent = "Message Sent Successfully.";

                successBox.classList.add("show");

                form.reset();

            } else {

                alert(data.message);

            }

        } catch (err) {

            console.log(err);

            alert("Unable to connect to server.");

        }

    });

})();