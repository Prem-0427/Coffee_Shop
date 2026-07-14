// ==========================================
// Coffee Admin Dashboard
// ==========================================

const API = "http://localhost:5000/api/admin";

const token = localStorage.getItem("adminToken");

if (!token) {
    window.location.href = "login.html";
}

// ==========================================
// Load Dashboard
// ==========================================

async function loadDashboard() {

    try {

        const response = await fetch(`${API}/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {

            console.log(await response.text());

            alert("Session expired or Unauthorized.");

            localStorage.removeItem("adminToken");
            localStorage.removeItem("admin");

            window.location.href = "login.html";

            return;

        }

        const data = await response.json();

        console.log("Dashboard Data:", data);

        // ==================================
        // Dashboard Cards
        // ==================================

        document.getElementById("usersCount").innerText =
            data.users || 0;

        document.getElementById("productsCount").innerText =
            data.products || 0;

        document.getElementById("ordersCount").innerText =
            data.orders || 0;

        document.getElementById("messagesCount").innerText =
            data.messages || 0;

        // ==================================
        // Recent Orders Table
        // ==================================

        const tbody = document.getElementById("recentOrders");

        tbody.innerHTML = "";

        if (!data.recentOrders || data.recentOrders.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align:center;">
                        No Orders Found
                    </td>
                </tr>
            `;

            return;

        }

        data.recentOrders.forEach(order => {

            tbody.innerHTML += `
                <tr>

                    <td>
                        ${order.user?.name || order.customerName || "Guest"}
                    </td>

                    <td>
                        ₹${order.totalAmount || order.total || 0}
                    </td>

                    <td>
                        ${order.status || "Pending"}
                    </td>

                </tr>
            `;

        });

    }

    catch (err) {

        console.error(err);

        alert("Unable to connect to server.");

    }

}

// ==========================================
// Auto Refresh
// ==========================================

loadDashboard();

setInterval(loadDashboard, 15000);