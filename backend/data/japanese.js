const { createProductList } = require('./dataHelper');

const japaneseBase = [
  { name: "Fresh Salmon Nigiri (4pcs)", basePrice: 420, isVeg: false, desc: "Hand-pressed sushi rice topped with premium sashimi-grade fresh Atlantic salmon.", imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80" },
  { name: "Classic California Roll (8pcs)", basePrice: 390, isVeg: false, desc: "Crab stick, avocado, cucumber wrapped in nori and sushi rice, sprinkled with tobiko.", imageUrl: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=500&q=80" },
  { name: "Avocado Cream Cheese Maki (8pcs)", basePrice: 340, isVeg: true, desc: "Creamy avocado and Philadelphia cream cheese rolled with toasted sesame seeds.", imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80" },
  { name: "Rich Tonkotsu Pork Ramen", basePrice: 460, isVeg: false, desc: "12-hour braised rich pork bone broth served with ramen noodles, chashu pork, and soft egg.", imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80" },
  { name: "Spicy Veg Miso Ramen Bowl", basePrice: 360, isVeg: true, desc: "Savory miso broth served with ramen noodles, grilled tofu, shiitake mushrooms, and bok choy.", imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80" },
  { name: "Crispy Ebi Shrimp Tempura (5pcs)", basePrice: 410, isVeg: false, desc: "Jumbo tiger prawns dipped in light crispy tempura batter served with tentsuyu dip.", imageUrl: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=500&q=80" },
  { name: "Chicken Teriyaki Donburi Bowl", basePrice: 380, isVeg: false, desc: "Pan-grilled chicken glazed in sweet sticky teriyaki sauce served over steamed Japanese rice.", imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" },
  { name: "Steamed Edamame Sea Salt", basePrice: 190, isVeg: true, desc: "Tender Japanese soybean pods tossed in cold-pressed sesame oil and coarse sea salt.", imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80" },
  { name: "Matcha Green Tea Ice Cream Mochi", basePrice: 220, isVeg: true, desc: "Sweet rice flour dough filled with premium Japanese matcha ice cream.", imageUrl: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=500&q=80" },
  { name: "Traditional Warm Miso Soup", basePrice: 150, isVeg: true, desc: "Traditional dashi broth with fermented soybean paste, silken tofu cubes, and wakame seaweed.", imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=80" }
];

const japaneseItems = createProductList("jp", japaneseBase);

module.exports = japaneseItems;
