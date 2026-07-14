// Kindling Coffee Co. — shared product data
// Single source of truth for the 15 drinks. Menu, search, filter, cart,
// and wishlist all read from this list instead of duplicating it.

window.COFFEES = [
  {
    id: 'espresso',
    name: 'Espresso',
    category: 'hot',
    price: 149,
    rating: 4.8,
    image: 'images/espresso.png',
    description: 'A tight, syrupy double shot. Where everything else on the menu starts.'
  },
  {
    id: 'americano',
    name: 'Americano',
    category: 'hot',
    price: 139,
    rating: 4.5,
    image: 'images/americano.jpeg',
    description: 'Espresso cut with hot water for a lighter body, full flavor.'
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'hot',
    price: 179,
    rating: 4.7,
    image: 'images/cappuccino.png',
    description: 'Equal parts espresso, steamed milk, and microfoam.'
  },
  {
    id: 'latte',
    name: 'Latte',
    category: 'hot',
    price: 199,
    rating: 4.6,
    image: 'images/latte.png',
    description: 'Espresso, steamed milk, a thin cap of foam. Reliable, every time.'
  },
  {
    id: 'mocha',
    name: 'Mocha',
    category: 'hot',
    price: 229,
    rating: 4.6,
    image: 'images/mocha.png',
    description: 'Espresso and steamed milk with house-made dark chocolate.'
  },
  {
    id: 'flatwhite',
    name: 'Flat White',
    category: 'hot',
    price: 189,
    rating: 4.7,
    image: 'images/flatwhite.png',
    description: 'Ristretto shots under velvety micro-foam. Stronger than a latte.'
  },
  {
    id: 'coldbrew',
    name: 'Cold Brew',
    category: 'cold',
    price: 209,
    rating: 4.8,
    image: 'images/coldbrew.png',
    description: 'Steeped 18 hours, low acid, naturally sweet.'
  },
  {
    id: 'icedlatte',
    name: 'Iced Latte',
    category: 'cold',
    price: 199,
    rating: 4.6,
    image: 'images/icedlatte.png',
    description: 'Espresso over cold milk and ice. Simple, done well.'
  },
  {
    id: 'icedamericano',
    name: 'Iced Americano',
    category: 'cold',
    price:299,
    rating: 4.4,
    image: 'images/icedamericano.png',
    description: 'Espresso and cold water over ice, nothing else.'
  },
  {
    id: 'frappe',
    name: 'Frappe',
    category: 'cold',
    price: 129,
    rating: 4.5,
    image: 'images/frappe.png',
    description: 'Blended cold with ice for an afternoon that needs one.'
  },
  {
    id: 'icedmocha',
    name: 'Iced Mocha',
    category: 'cold',
    price: 149,
    rating: 4.6,
    image: 'images/icedmocha.png',
    description: 'Chocolate, espresso, cold milk, ice. Dessert weather, any season.'
  },
  {
    id: 'affogato',
    name: 'Affogato',
    category: 'dessert',
    price: 249,
    rating: 4.9,
    image: 'images/affogato.jpeg',
    description: 'A hot shot of espresso poured over vanilla gelato.'
  },
  {
    id: 'tiramisu',
    name: 'Tiramisu',
    category: 'dessert',
    price: 279,
    rating: 4.8,
    image: 'images/tiramisu.png',
    description: 'Espresso-soaked ladyfingers, mascarpone, cocoa. Made in-house.'
  },
  {
    id: 'croissant',
    name: 'Chocolate Croissant',
    category: 'dessert',
    price: 159,
    rating: 4.5,
    image: 'images/croissant.png',
    description: 'Laminated dough, dark chocolate batons, baked each morning.'
  },
  {
    id: 'bananabread',
    name: 'Banana Bread',
    category: 'dessert',
    price: 149,
    rating: 4.4,
    image: 'images/bananabread.png',
    description: 'Dense, moist, a little caramelized on the edges.'
  }
];
