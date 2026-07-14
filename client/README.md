#Coffee Co.

A small e-commerce-style coffee shop site built with plain HTML, CSS, and JavaScript — no frameworks, no build step, no backend. Everything (cart, wishlist, login) is stored in the browser's `localStorage`.

## Structure

```
Coffee-Shop/
├── index.html          Home
├── menu.html            Coffee menu (15 drinks, search + category filters)
├── cart.html            Shopping cart
├── wishlist.html        Wishlist
├── checkout.html        Checkout + mock order confirmation
├── login.html           Log in
├── signup.html          Sign up
├── about.html           Brand story
├── contact.html         Contact form
│
├── css/
│   ├── style.css        Base styles, tokens, nav, hero, footer
│   ├── menu.css         Menu grid + ticket-style product cards
│   ├── cart.css         Cart, receipt summary, checkout
│   ├── auth.css         Login/signup/contact form styling
│   ├── responsive.css   Mobile & tablet breakpoints
│   └── darkmode.css     Dark-mode-specific tweaks
│
├── js/
│   ├── app.js            Mobile nav toggle, cart badge sync
│   ├── cart.js            Cart page logic
│   ├── wishlist.js        Wishlist page logic
│   ├── search.js          Live menu search
│   ├── filter.js          Menu rendering + category filters
│   ├── darkmode.js        Dark mode toggle (persisted)
│   ├── login.js           Login/signup validation
│   └── checkout.js        Checkout + order confirmation
│
├── data/
│   └── coffees.js         Single source of truth for all 15 drinks
│
├── images/                Placeholder product photos (swap with real ones)
└── README.md
```

## Running it

No build step needed — open `index.html` directly in a browser, or serve the folder with any static file server.

## Notes

- **No backend.** Login/signup, cart, and wishlist all live in `localStorage`, scoped to the browser they're used in.
- **Placeholder images.** All product photos are generated placeholders — swap in real photography under `images/` using the same filenames referenced in `data/coffees.js`.
- **Dark mode** persists across pages via `localStorage` and respects `prefers-color-scheme` on first visit.
- **Accessibility basics covered**: keyboard-focusable controls, `aria-label`s on icon buttons, `prefers-reduced-motion` respected.
