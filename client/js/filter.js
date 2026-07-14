// Kindling Coffee Co. — menu rendering + category filters
// search.js layers live text search on top of this same grid via window.MenuFilter.

(function () {
  const CART_KEY = 'kindling-cart';
  const WISHLIST_KEY = 'kindling-wishlist';

  const grid = document.getElementById('menuGrid');
  if (!grid || !window.COFFEES) return;

  let activeCategory = 'all';
  let searchTerm = '';

  function getStored(key) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  }

  function setStored(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function isWishlisted(id) {
    return getStored(WISHLIST_KEY).some(function (item) { return item.id === id; });
  }

  function starString(rating) {
    const full = Math.round(rating);
    return '<span class="star">' + '&#9733;'.repeat(full) + '</span>' +
      '&#9734;'.repeat(5 - full) + ' <span>' + rating.toFixed(1) + '</span>';
  }

  function cardHTML(item) {
    const wished = isWishlisted(item.id);
    return (
      '<article class="coffee-card" data-id="' + item.id + '">' +
        '<div class="thumb">' +
          '<img src="' + item.image + '" alt="' + item.name + '">' +
          '<button class="wish-btn' + (wished ? ' active' : '') + '" aria-label="Toggle wishlist">' +
            (wished ? '&#9829;' : '&#9825;') +
          '</button>' +
        '</div>' +
        '<div class="body">' +
          '<div class="row-top">' +
            '<h3>' + item.name + '</h3>' +
            '<span class="price">₹' + item.price.toFixed(2) + '</span>' +
          '</div>' +
          '<p class="desc">' + item.description + '</p>' +
          '<div class="rating">' + starString(item.rating) + '</div>' +
          '<button class="add-btn">Add to cart</button>' +
        '</div>' +
      '</article>'
    );
  }

  function render() {
    let items = activeCategory === 'all'
      ? window.COFFEES
      : window.COFFEES.filter(function (c) { return c.category === activeCategory; });

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      items = items.filter(function (c) {
        return c.name.toLowerCase().indexOf(term) > -1 ||
          c.description.toLowerCase().indexOf(term) > -1;
      });
    }

    grid.innerHTML = items.length
      ? items.map(cardHTML).join('')
      : '<p class="menu-empty">No drinks match' + (searchTerm ? ' "' + searchTerm + '"' : ' this category') + '.</p>';
  }

  function addToCart(id) {
    const cart = getStored(CART_KEY);
    const existing = cart.find(function (c) { return c.id === id; });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: id, qty: 1 });
    }
    setStored(CART_KEY, cart);

    const badge = document.getElementById('cartBadge');
    if (badge) {
      const count = cart.reduce(function (sum, c) { return sum + c.qty; }, 0);
      badge.textContent = count;
    }
  }

  function toggleWishlist(id) {
    const list = getStored(WISHLIST_KEY);
    const idx = list.findIndex(function (c) { return c.id === id; });
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push({ id: id });
    }
    setStored(WISHLIST_KEY, list);
  }

  grid.addEventListener('click', function (e) {
    const card = e.target.closest('.coffee-card');
    if (!card) return;
    const id = card.dataset.id;

    if (e.target.closest('.add-btn')) {
      addToCart(id);
      const btn = e.target.closest('.add-btn');
      btn.textContent = 'Added';
      btn.classList.add('added');
      setTimeout(function () {
        btn.textContent = 'Add to cart';
        btn.classList.remove('added');
      }, 1200);
    }

    if (e.target.closest('.wish-btn')) {
      toggleWishlist(id);
      const btn = e.target.closest('.wish-btn');
      const nowActive = btn.classList.toggle('active');
      btn.innerHTML = nowActive ? '&#9829;' : '&#9825;';
    }
  });

  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      activeCategory = tab.dataset.category;
      render();
    });
  });

  render();

  // Public hook for search.js — keeps category state and re-render logic
  // in one place instead of duplicating the filtering rules.
  window.MenuFilter = {
    setSearch: function (term) {
      searchTerm = term;
      render();
    }
  };
})();
