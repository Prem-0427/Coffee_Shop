// Kindling Coffee Co. — dark mode toggle
// Persists the user's choice in localStorage so it holds across pages.

(function () {
  const STORAGE_KEY = 'kindling-theme';
  const root = document.body;

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('darkToggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      const isDark = root.classList.toggle('dark');
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    });
  });
})();
