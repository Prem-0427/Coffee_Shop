const API = "https://coffee-shop-backend.onrender.com/api/messages";

const token = localStorage.getItem("adminToken");

if (!token) {
    window.location.href = "login.html";
}
async function loadMessages() {

    try {

        const response = await fetch(API, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Status:", response.status);

        const data = await response.json();

        console.log("Messages:", data);

        const table = document.getElementById("messageTable");
        table.innerHTML = "";

        if (!Array.isArray(data) || data.length === 0) {

            table.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No Messages Found
                </td>
            </tr>`;
            return;
        }

        data.forEach(msg => {

            table.innerHTML += `
<tr>
    <td>${msg.name}</td>
    <td>${msg.email}</td>
    <td>${msg.subject}</td>
    <td>${msg.message}</td>
    <td>
        <button onclick="deleteMessage('${msg._id}')">
            Delete
        </button>
    </td>
</tr>
`;
        });

    } catch (err) {

        console.error(err);

    }

}
async function markRead(id) {

    await fetch(API + "/" + id, {

        method: "PUT",

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    loadMessages();

}

async function deleteMessage(id) {

    if (!confirm("Delete this message?")) return;

    await fetch(API + "/" + id, {

        method: "DELETE",

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    loadMessages();

}

function logout() {

    localStorage.removeItem("adminToken");

    localStorage.removeItem("admin");

    window.location.href = "login.html";

}

loadMessages();