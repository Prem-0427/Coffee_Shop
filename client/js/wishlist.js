// Kindling Coffee Co. — wishlist page logic

(function () {
  const WISHLIST_KEY = 'kindling-wishlist';
  const CART_KEY = 'kindling-cart';

  const grid = document.getElementById('wishlistGrid');
  if (!grid || !window.COFFEES) return;

  function getStored(key) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  }

  function setStored(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function findProduct(id) {
    return window.COFFEES.find(function (c) { return c.id === id; });
  }

  function syncCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const cart = getStored(CART_KEY);
    badge.textContent = cart.reduce(function (sum, c) { return sum + c.qty; }, 0);
  }

  function cardHTML(product) {
    return (
      '<article class="coffee-card" data-id="' + product.id + '">' +
        '<div class="thumb">' +
          '<img src="' + product.image + '" alt="' + product.name + '">' +
          '<button class="wish-btn active" aria-label="Remove from wishlist">&#9829;</button>' +
        '</div>' +
        '<div class="body">' +
          '<div class="row-top">' +
            '<h3>' + product.name + '</h3>' +
            '<span class="price">₹' + product.price.toFixed(2) + '</span>' +
          '</div>' +
          '<p class="desc">' + product.description + '</p>' +
          '<button class="add-btn">Move to cart</button>' +
        '</div>' +
      '</article>'
    );
  }

  function render() {
    const wishlist = getStored(WISHLIST_KEY);
    const products = wishlist.map(function (w) { return findProduct(w.id); }).filter(Boolean);

    grid.innerHTML = products.length
      ? products.map(cardHTML).join('')
      : '<div class="cart-empty"><p>Nothing saved yet.</p><a href="menu.html">Browse the menu &rarr;</a></div>';
  }

  grid.addEventListener('click', function (e) {
    const card = e.target.closest('.coffee-card');
    if (!card) return;
    const id = card.dataset.id;

    if (e.target.closest('.wish-btn')) {
      const wishlist = getStored(WISHLIST_KEY).filter(function (w) { return w.id !== id; });
      setStored(WISHLIST_KEY, wishlist);
      render();
    }

    if (e.target.closest('.add-btn')) {
      const cart = getStored(CART_KEY);
      const existing = cart.find(function (c) { return c.id === id; });
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ id: id, qty: 1 });
      }
      setStored(CART_KEY, cart);

      const wishlist = getStored(WISHLIST_KEY).filter(function (w) { return w.id !== id; });
      setStored(WISHLIST_KEY, wishlist);

      syncCartBadge();
      render();
    }
  });

  render();
})();
