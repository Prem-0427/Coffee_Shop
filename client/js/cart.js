// Kindling Coffee Co. — cart page logic

(function () {
  const CART_KEY = 'kindling-cart';
  const TAX_RATE = 0.08;

  const itemsEl = document.getElementById('cartItems');
  const summaryEl = document.getElementById('cartSummary');
  if (!itemsEl || !window.COFFEES) return;

  function getCart() {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  function setCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    const badge = document.getElementById('cartBadge');
    if (badge) {
      const count = cart.reduce(function (sum, c) { return sum + c.qty; }, 0);
      badge.textContent = count;
    }
  }

  function findProduct(id) {
    return window.COFFEES.find(function (c) { return c.id === id; });
  }

  function money(n) {
    return '₹' + n.toFixed(2);
  }

  function render() {
    const cart = getCart();

    if (!cart.length) {
      itemsEl.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p><a href="menu.html">Browse the menu &rarr;</a></div>';
      summaryEl.innerHTML = '';
      return;
    }

    itemsEl.innerHTML = cart.map(function (line) {
      const product = findProduct(line.id);
      if (!product) return '';
      const lineTotal = product.price * line.qty;
      return (
        '<div class="cart-item" data-id="' + product.id + '">' +
          '<div class="thumb"><img src="' + product.image + '" alt="' + product.name + '"></div>' +
          '<div class="info">' +
            '<h3>' + product.name + '</h3>' +
            '<span class="unit-price">' + money(product.price) + ' each</span>' +
          '</div>' +
          '<div class="qty-control">' +
            '<button class="qty-dec" aria-label="Decrease quantity">&minus;</button>' +
            '<span class="qty-val">' + line.qty + '</span>' +
            '<button class="qty-inc" aria-label="Increase quantity">+</button>' +
          '</div>' +
          '<span class="line-total">' + money(lineTotal) + '</span>' +
          '<button class="remove-btn">Remove</button>' +
        '</div>'
      );
    }).join('');

    const subtotal = cart.reduce(function (sum, line) {
      const product = findProduct(line.id);
      return sum + (product ? product.price * line.qty : 0);
    }, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    const itemCount = cart.reduce(function (sum, l) { return sum + l.qty; }, 0);

    summaryEl.innerHTML =
      '<h3>Order summary</h3>' +
      '<div class="row"><span>' + itemCount + ' item' + (itemCount === 1 ? '' : 's') + '</span><span>' + money(subtotal) + '</span></div>' +
      '<div class="row"><span>Tax</span><span>' + money(tax) + '</span></div>' +
      '<hr>' +
      '<div class="row total"><span>Total</span><span>' + money(total) + '</span></div>' +
      '<a href="checkout.html" class="btn btn-primary">Proceed to checkout</a>';
  }

  itemsEl.addEventListener('click', function (e) {
    const row = e.target.closest('.cart-item');
    if (!row) return;
    const id = row.dataset.id;
    const cart = getCart();
    const line = cart.find(function (c) { return c.id === id; });
    if (!line) return;

    if (e.target.closest('.qty-inc')) {
      line.qty += 1;
    } else if (e.target.closest('.qty-dec')) {
      line.qty -= 1;
      if (line.qty <= 0) {
        const idx = cart.indexOf(line);
        cart.splice(idx, 1);
      }
    } else if (e.target.closest('.remove-btn')) {
      const idx = cart.indexOf(line);
      cart.splice(idx, 1);
    } else {
      return;
    }

    setCart(cart);
    render();
  });

  render();
})();
