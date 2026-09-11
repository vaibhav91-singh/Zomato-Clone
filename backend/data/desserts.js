const { createProductList } = require('./dataHelper');

const dessertBase = [
  { name: "Lotus Biscoff Baked Cheesecake", basePrice: 250, isVeg: true, desc: "Velvety baked cheesecake topped with cookie butter sauce and biscoff biscuit crumbs.", imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=80" },
  { name: "Gooey Molten Lava Cake", basePrice: 160, isVeg: true, desc: "Hot chocolate cake with a molten center of warm liquid dark chocolate.", imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80" },
  { name: "Triple Chocolate Waffle", basePrice: 199, isVeg: true, desc: "Warm crispy waffle smothered in white, milk, and dark Belgian chocolate drizzles.", imageUrl: "https://images.unsplash.com/photo-1562376502-6f769499c886?auto=format&fit=crop&w=500&q=80" },
  { name: "Sizzling Walnut Brownie Sundae", basePrice: 220, isVeg: true, desc: "Rich fudgy brownie served hot on a sizzler plate topped with vanilla scoop and hot fudge.", imageUrl: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=500&q=80" },
  { name: "Red Velvet Cream Cheese Slice", basePrice: 180, isVeg: true, desc: "Moist red velvet sponge cake layered with fluffy cream cheese frosting.", imageUrl: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=500&q=80" },
  { name: "French Vanilla Bean Gelato", basePrice: 150, isVeg: true, desc: "Artisanal slow-churned gelato made with real Madagascan vanilla pods.", imageUrl: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=500&q=80" },
  { name: "Churros with Dark Chocolate Dip", basePrice: 190, isVeg: true, desc: "Spanish fried pastry loops coated in cinnamon sugar served with warm dark chocolate sauce.", imageUrl: "https://images.unsplash.com/photo-1624371414361-e670edf4898d?auto=format&fit=crop&w=500&q=80" },
  { name: "Royal Gulab Jamun (2pcs)", basePrice: 110, isVeg: true, desc: "Soft khoya dumplings fried golden and soaked in cardamom saffron sugar syrup.", imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=500&q=80" },
  { name: "Kesar Pista Rasmalai (2pcs)", basePrice: 140, isVeg: true, desc: "Spongy cottage cheese discs soaked in chilled saffron and pistachio milk.", imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=500&q=80" },
  { name: "Classic Tiramisu Cup", basePrice: 230, isVeg: true, desc: "Espresso soaked ladyfingers layered with creamy mascarpone cheese and cocoa dust.", imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=80" },
  { name: "Warm Apple Cinnamon Pie", basePrice: 190, isVeg: true, desc: "Flaky baked pastry crust filled with spiced caramelized apples and cinnamon syrup.", imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=80" },
  { name: "French Macarons Box (4pcs)", basePrice: 260, isVeg: true, desc: "Delicate almond meringue cookies filled with chocolate ganache and raspberry jam.", imageUrl: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=500&q=80" }
];

const dessertItems = createProductList("ds", dessertBase);

module.exports = dessertItems;
