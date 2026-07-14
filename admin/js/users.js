const API = "http://localhost:5000/api/admin";

const token = localStorage.getItem("adminToken");

if (!token) {
    window.location.href = "login.html";
}

let users = [];

// ===============================
// Load All Users
// ===============================

async function loadUsers() {

    try {

        const response = await fetch(API + "/users", {

            headers: {
                Authorization: "Bearer " + token
            }

        });

        if (!response.ok) {

            alert("Unable to fetch users");
            return;

        }

        users = await response.json();

        displayUsers(users);

    }

    catch (err) {

        console.log(err);
        alert("Server Error");

    }

}

// ===============================
// Display Users
// ===============================

function displayUsers(data) {

    const table = document.getElementById("userTable");

    table.innerHTML = "";

    if (data.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="5" style="text-align:center;">
                No Users Found
            </td>
        </tr>`;

        return;

    }

    data.forEach(user => {

        table.innerHTML += `

        <tr>

            <td>${user.name}</td>

            <td>${user.email}</td>

            <td>${user.role}</td>

            <td>${new Date(user.createdAt).toLocaleDateString()}</td>

            <td>

                <button onclick="deleteUser('${user._id}')">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ===============================
// Search Users
// ===============================

function searchUser() {

    const keyword = document
        .getElementById("searchUser")
        .value
        .toLowerCase();

    const filtered = users.filter(user =>

        user.name.toLowerCase().includes(keyword) ||

        user.email.toLowerCase().includes(keyword)

    );

    displayUsers(filtered);

}

// ===============================
// Delete User
// ===============================

async function deleteUser(id) {

    if (!confirm("Delete this user?")) return;

    try {

        const response = await fetch(API + "/users/" + id, {

            method: "DELETE",

            headers: {

                Authorization: "Bearer " + token

            }

        });

        const data = await response.json();

        alert(data.message);

        loadUsers();

    }

    catch (err) {

        console.log(err);

    }

}

// ===============================
// Logout
// ===============================

function logout() {

    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    window.location.href = "login.html";

}

loadUsers();