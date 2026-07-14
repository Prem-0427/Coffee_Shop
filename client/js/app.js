// Kindling Coffee Co. — shared app behavior (mobile nav, cart badge)

document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // Placeholder cart badge sync — cart.js will own real cart state
  // once the Shopping Cart module is built (Step 3).
  const cartBadge = document.getElementById('cartBadge');
  if (cartBadge) {
    const stored = localStorage.getItem('kindling-cart');
    const items = stored ? JSON.parse(stored) : [];
    const count = items.reduce(function (sum, item) { return sum + (item.qty || 1); }, 0);
    cartBadge.textContent = count;
  }
});
