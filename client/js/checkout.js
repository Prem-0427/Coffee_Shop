// ==========================================
// Coffee Shop Checkout
// ==========================================

(function () {

    const API = "http://localhost:5000/api/orders";

    const CART_KEY = "kindling-cart";
    const TAX_RATE = 0.08;
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const summaryEl = document.getElementById("checkoutSummary");
    const formSection = document.getElementById("checkoutFormSection");
    const confirmSection = document.getElementById("checkoutConfirm");
    const form = document.getElementById("checkoutForm");

    if (!summaryEl || !window.COFFEES) return;

    // =====================================
    // CART
    // =====================================

    function getCart() {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : [];
    }

    function setCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));

        const badge = document.getElementById("cartBadge");

        if (badge) {
            badge.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
        }
    }

    function findProduct(id) {
        return window.COFFEES.find(p => p.id === id);
    }

    function money(value) {
        return "₹" + value.toFixed(2);
    }

    function totals(cart) {

        const subtotal = cart.reduce((sum, item) => {

            const product = findProduct(item.id);

            return sum + (product ? product.price * item.qty : 0);

        }, 0);

        const tax = subtotal * TAX_RATE;

        return {
            subtotal,
            tax,
            total: subtotal + tax
        };
    }

    // =====================================
    // SUMMARY
    // =====================================

    function renderSummary() {

        const cart = getCart();

        if (!cart.length) {

            summaryEl.innerHTML =
                "<p>Your cart is empty. <a href='menu.html'>Browse Menu</a></p>";

            if (form)
                form.querySelector("button").disabled = true;

            return;
        }

        const t = totals(cart);

        let html = "<h3>Order Summary</h3>";

        cart.forEach(item => {

            const product = findProduct(item.id);

            html += `

            <div class="row">

                <span>${item.qty} × ${product.name}</span>

                <span>${money(product.price * item.qty)}</span>

            </div>

            `;
        });

        html += `

        <hr>

        <div class="row">

            <span>Subtotal</span>

            <span>${money(t.subtotal)}</span>

        </div>

        <div class="row">

            <span>Tax</span>

            <span>${money(t.tax)}</span>

        </div>

        <hr>

        <div class="row total">

            <strong>Total</strong>

            <strong>${money(t.total)}</strong>

        </div>

        `;

        summaryEl.innerHTML = html;
    }

    // =====================================
    // VALIDATION
    // =====================================

    function validate() {

        const name = document.getElementById("checkoutName").value.trim();
        const email = document.getElementById("checkoutEmail").value.trim();
        const pickupTime = document.getElementById("checkoutTime").value;

        if (name.length < 2) {

            alert("Enter valid name");

            return false;

        }

        if (!EMAIL_RE.test(email)) {

            alert("Enter valid email");

            return false;

        }

        if (!pickupTime) {

            alert("Choose pickup time");

            return false;

        }

        return true;
    }

    // =====================================
    // PLACE ORDER
    // =====================================

    if (form) {

        form.addEventListener("submit", async function (e) {

            e.preventDefault();

            if (!validate()) return;

            const cart = getCart();

            if (!cart.length) {

                alert("Cart is empty");

                return;

            }

            const t = totals(cart);

            const order = {

                customerName: document.getElementById("checkoutName").value.trim(),

                email: document.getElementById("checkoutEmail").value.trim(),

                pickupTime: document.getElementById("checkoutTime").value,

                totalAmount: t.total,

                items: cart.map(item => {

                    const p = findProduct(item.id);

                    return {

                        name: p.name,

                        quantity: item.qty,

                        price: p.price,

                        image: p.image

                    };

                })

            };

            console.log("Sending Order:", order);

            try {

                const response = await fetch(API, {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify(order)

                });

                const data = await response.json();

                console.log(data);

                if (!response.ok) {

                    alert(data.message);

                    return;

                }

                document.getElementById("confirmOrderNumber").textContent =
                    data.order._id.substring(0, 8).toUpperCase();

                document.getElementById("confirmName").textContent =
                    order.customerName;

                document.getElementById("confirmTime").textContent =
                    order.pickupTime;

                document.getElementById("confirmTotal").textContent =
                    money(order.totalAmount);

                setCart([]);

                formSection.style.display = "none";

                confirmSection.classList.add("show");

            }

            catch (err) {

                console.log(err);

                alert("Unable to place order.");

            }

        });

    }

    renderSummary();

})();