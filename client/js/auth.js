// Protect Pages
const token = localStorage.getItem("token");

const protectedPages = [
    "menu.html",
    "cart.html",
    "wishlist.html",
    "checkout.html"
];

const currentPage = window.location.pathname.split("/").pop();

if (protectedPages.includes(currentPage) && !token) {
    window.location.href = "login.html";
}

// Logout
document.addEventListener("DOMContentLoaded", () => {

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function (e) {

            e.preventDefault();

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            alert("Logged Out Successfully");

            window.location.href = "login.html";

        });

    }

});