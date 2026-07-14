// ==========================================
// Coffee Admin - Products
// ==========================================

const API = "http://localhost:5000/api/products";

const token = localStorage.getItem("adminToken");

if (!token) {
    window.location.href = "login.html";
}

const productTable = document.getElementById("productTable");
const productForm = document.getElementById("productForm");

const editModal = document.getElementById("editModal");
const closeModal = document.getElementById("closeModal");
const editForm = document.getElementById("editForm");

let products = [];

// ==========================================
// Load Products
// ==========================================

async function loadProducts() {

    try {

        const response = await fetch(API);

        const data = await response.json();

        console.log("Products:", data);

        products = data;

        displayProducts(products);

    } catch (err) {

        console.log(err);

        alert("Unable to load products.");

    }

}

// ==========================================
// Display Products
// ==========================================

function displayProducts(list) {

    productTable.innerHTML = "";

    if (!list.length) {

        productTable.innerHTML = `
        <tr>
            <td colspan="6" style="text-align:center">
                No Products Found
            </td>
        </tr>
        `;

        return;

    }

    list.forEach(product => {

        productTable.innerHTML += `

        <tr>

            <td>

                <img
                src="../${product.image}"
                width="70"
                height="70"
                style="object-fit:cover;border-radius:8px">

            </td>

            <td>${product.name}</td>

            <td>${product.category}</td>

            <td>₹${product.price}</td>

            <td>

                ${
                    product.available
                    ? "<span style='color:green;font-weight:bold'>Available</span>"
                    : "<span style='color:red;font-weight:bold'>Out Of Stock</span>"
                }

            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="openEdit('${product._id}')">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteProduct('${product._id}')">
                    Delete
                </button>

            </td>

        </tr>

        `;

    });

}

// ==========================================
// Add Product
// ==========================================

productForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const product = {

        name: document.getElementById("name").value,

        category: document.getElementById("category").value,

        price: Number(document.getElementById("price").value),

        image: document.getElementById("image").value,

        description: document.getElementById("description").value,

        available: document.getElementById("available").checked

    };

    try {

        const response = await fetch(API, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",
                Authorization: "Bearer " + token

            },

            body: JSON.stringify(product)

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        alert("Product Added Successfully");

        productForm.reset();

        loadProducts();

    } catch (err) {

        console.log(err);

    }

});

// ==========================================
// Open Edit Modal
// ==========================================

function openEdit(id) {

    const product = products.find(p => p._id === id);

    if (!product) return;

    document.getElementById("editId").value = product._id;
    document.getElementById("editName").value = product.name;
    document.getElementById("editCategory").value = product.category;
    document.getElementById("editPrice").value = product.price;
    document.getElementById("editImage").value = product.image;
    document.getElementById("editDescription").value = product.description;
    document.getElementById("editAvailable").checked = product.available;

    editModal.style.display = "block";

}

// ==========================================
// Close Modal
// ==========================================

closeModal.onclick = () => {

    editModal.style.display = "none";

}

window.onclick = (e) => {

    if (e.target == editModal) {

        editModal.style.display = "none";

    }

}

// ==========================================
// Update Product
// ==========================================

editForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const id = document.getElementById("editId").value;

    const product = {

        name: document.getElementById("editName").value,

        category: document.getElementById("editCategory").value,

        price: Number(document.getElementById("editPrice").value),

        image: document.getElementById("editImage").value,

        description: document.getElementById("editDescription").value,

        available: document.getElementById("editAvailable").checked

    };

    try {

        const response = await fetch(API + "/" + id, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",
                Authorization: "Bearer " + token

            },

            body: JSON.stringify(product)

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        alert("Product Updated");

        editModal.style.display = "none";

        loadProducts();

    } catch (err) {

        console.log(err);

    }

});

// ==========================================
// Delete Product
// ==========================================

async function deleteProduct(id) {

    if (!confirm("Delete this product?")) return;

    try {

        const response = await fetch(API + "/" + id, {

            method: "DELETE",

            headers: {

                Authorization: "Bearer " + token

            }

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        alert("Product Deleted");

        loadProducts();

    } catch (err) {

        console.log(err);

    }

}

// ==========================================
// Search
// ==========================================

const search = document.createElement("input");

search.placeholder = "Search Product...";

search.className = "search-box";

document.querySelector(".main h1").after(search);

search.addEventListener("keyup", () => {

    const keyword = search.value.toLowerCase();

    const filtered = products.filter(product =>

        product.name.toLowerCase().includes(keyword) ||

        product.category.toLowerCase().includes(keyword)

    );

    displayProducts(filtered);

});

// ==========================================
// Image Preview
// ==========================================

const imageInput = document.getElementById("image");

const preview = document.createElement("img");

preview.style.width = "120px";
preview.style.marginTop = "15px";
preview.style.borderRadius = "10px";
preview.style.display = "none";

imageInput.parentNode.appendChild(preview);

imageInput.addEventListener("input", () => {

    if (imageInput.value.trim() == "") {

        preview.style.display = "none";

        return;

    }

    preview.src = "../" + imageInput.value;

    preview.style.display = "block";

});

// ==========================================
// Auto Refresh
// ==========================================

setInterval(loadProducts, 20000);

// ==========================================
// Start
// ==========================================

loadProducts();