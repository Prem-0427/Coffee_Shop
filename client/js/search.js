// Kindling Coffee Co. — live search on the menu grid
// Debounces keystrokes, then hands the term to filter.js via window.MenuFilter
// so category + search apply together instead of overriding each other.

(function () {
  const input = document.getElementById('menuSearch');
  if (!input) return;

  let debounceTimer;

  input.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    const value = input.value.trim();
    debounceTimer = setTimeout(function () {
      if (window.MenuFilter) {
        window.MenuFilter.setSearch(value);
      }
    }, 150);
  });
})();
