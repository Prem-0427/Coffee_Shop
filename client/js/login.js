// ===========================================
// Kindling Coffee Co. Authentication
// Login + Signup using Node.js + MongoDB
// ===========================================

(function () {

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(field, message) {
    field.classList.add("has-error");

    const msg = field.querySelector(".error-msg");

    if (msg) {
      msg.textContent = message;
    }
  }

  function clearFieldError(field) {
    field.classList.remove("has-error");

    const msg = field.querySelector(".error-msg");

    if (msg) {
      msg.textContent = "";
    }
  }

  function validateField(field, input, rules) {

    for (const rule of rules) {

      if (!rule.test(input.value)) {

        setFieldError(field, rule.message);

        return false;

      }

    }

    clearFieldError(field);

    return true;

  }

  // ==================================================
  // LOGIN
  // ==================================================

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {

    const emailField = document.getElementById("loginEmailField");
    const passField = document.getElementById("loginPasswordField");

    const emailInput = document.getElementById("loginEmail");
    const passInput = document.getElementById("loginPassword");

    const successBox = document.getElementById("loginSuccess");

    loginForm.addEventListener("submit", async function (e) {

      e.preventDefault();

      const emailOk = validateField(emailField, emailInput, [

        {
          test: v => v.trim().length > 0,
          message: "Enter your email."
        },

        {
          test: v => EMAIL_RE.test(v.trim()),
          message: "Enter a valid email address."
        }

      ]);

      const passOk = validateField(passField, passInput, [

        {
          test: v => v.length > 0,
          message: "Enter your password."
        },

        {
          test: v => v.length >= 8,
          message: "Password must be at least 8 characters."
        }

      ]);

      if (!emailOk || !passOk) return;

      try {

        const response = await fetch("http://localhost:5000/api/auth/login", {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            email: emailInput.value.trim(),

            password: passInput.value

          })

        });

        const data = await response.json();

        if (data.success) {

          localStorage.setItem("token", data.token);

          localStorage.setItem("user", JSON.stringify(data.user));

          successBox.textContent = "Login Successful. Redirecting...";

          successBox.classList.add("show");

          setTimeout(function () {

            window.location.href = "menu.html";

          }, 1000);

        } else {

          setFieldError(emailField, data.message);

        }

      } catch (err) {

        console.error(err);

        alert("Unable to connect to server.");

      }

    });

  }

  // ==================================================
  // SIGNUP
  // ==================================================

  const signupForm = document.getElementById("signupForm");

  if (signupForm) {

    const nameField = document.getElementById("signupNameField");
    const emailField = document.getElementById("signupEmailField");
    const passField = document.getElementById("signupPasswordField");
    const confirmField = document.getElementById("signupConfirmField");

    const nameInput = document.getElementById("signupName");
    const emailInput = document.getElementById("signupEmail");
    const passInput = document.getElementById("signupPassword");
    const confirmInput = document.getElementById("signupConfirm");

    const successBox = document.getElementById("signupSuccess");

    signupForm.addEventListener("submit", async function (e) {

      e.preventDefault();

      const nameOk = validateField(nameField, nameInput, [

        {
          test: v => v.trim().length >= 2,
          message: "Enter your full name."
        }

      ]);

      const emailOk = validateField(emailField, emailInput, [

        {
          test: v => v.trim().length > 0,
          message: "Enter your email."
        },

        {
          test: v => EMAIL_RE.test(v.trim()),
          message: "Enter a valid email address."
        }

      ]);

      const passOk = validateField(passField, passInput, [

        {
          test: v => v.length >= 8,
          message: "Password must be at least 8 characters."
        }

      ]);

      const confirmOk = validateField(confirmField, confirmInput, [

        {
          test: v => v === passInput.value,
          message: "Passwords do not match."
        }

      ]);

      if (!nameOk || !emailOk || !passOk || !confirmOk) return;

      try {

        const response = await fetch("http://localhost:5000/api/auth/signup", {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            name: nameInput.value.trim(),

            email: emailInput.value.trim(),

            password: passInput.value

          })

        });

        const data = await response.json();

        if (data.success) {

          successBox.textContent = "Account Created Successfully";

          successBox.classList.add("show");

          setTimeout(function () {

            window.location.href = "login.html";

          }, 1000);

        } else {

          setFieldError(emailField, data.message);

        }

      } catch (err) {

        console.error(err);

        alert("Unable to connect to server.");

      }

    });

  }

})();