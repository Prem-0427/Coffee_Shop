const API = "https://coffee-shop-backend.onrender.com/api/orders";

const token = localStorage.getItem("adminToken");

if (!token) {

    window.location.href = "login.html";

}

const table = document.getElementById("orderTable");

// =======================================
// Load Orders
// =======================================

async function loadOrders() {

    try {

        const response = await fetch(API, {

            headers: {

                Authorization: "Bearer " + token

            }

        });

        const orders = await response.json();

        table.innerHTML = "";

        if (orders.length === 0) {

            table.innerHTML = `

            <tr>

                <td colspan="8" style="text-align:center">

                    No Orders Found

                </td>

            </tr>

            `;

            return;

        }

        orders.forEach(order => {

            let items = "";

            order.items.forEach(item => {

                items += `
                    ${item.name}
                    (${item.quantity})<br>
                `;

            });

            table.innerHTML += `

            <tr>

                <td>${order.customerName}</td>

                <td>${order.email}</td>

                <td>${order.pickupTime}</td>

                <td>₹${order.totalAmount}</td>

                <td>

                    <select
                        onchange="updateStatus('${order._id}',this.value)">

                        <option
                        ${order.status=="Pending"?"selected":""}>
                        Pending
                        </option>

                        <option
                        ${order.status=="Preparing"?"selected":""}>
                        Preparing
                        </option>

                        <option
                        ${order.status=="Delivered"?"selected":""}>
                        Delivered
                        </option>

                        <option
                        ${order.status=="Cancelled"?"selected":""}>
                        Cancelled
                        </option>

                    </select>

                </td>

                <td>${order.paymentStatus}</td>

                <td>${items}</td>

                <td>

                    <button
                    onclick="deleteOrder('${order._id}')">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch(err){

        console.log(err);

    }

}

// =======================================
// Update Status
// =======================================

async function updateStatus(id,status){

    await fetch(API+"/"+id,{

        method:"PUT",

        headers:{

            "Content-Type":"application/json",

            Authorization:"Bearer "+token

        },

        body:JSON.stringify({

            status:status

        })

    });

    loadOrders();

}

// =======================================
// Delete Order
// =======================================

async function deleteOrder(id){

    if(!confirm("Delete this order?")) return;

    await fetch(API+"/"+id,{

        method:"DELETE",

        headers:{

            Authorization:"Bearer "+token

        }

    });

    loadOrders();

}

// =======================================

loadOrders();