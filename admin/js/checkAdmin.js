const adminToken = localStorage.getItem("adminToken");

if (!adminToken) {
    window.location.href = "login.html";
}