const { createProductList } = require('./dataHelper');

const breakfastBase = [
  { name: "Classic Eggs Benedict", basePrice: 290, isVeg: false, desc: "Poached eggs on toasted English muffin with smoked ham and creamy hollandaise sauce.", imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=80" },
  { name: "Belgian Butter Waffles", basePrice: 240, isVeg: true, desc: "Fluffy golden waffles served with whipped butter, maple syrup, and fresh berries.", imageUrl: "https://images.unsplash.com/photo-1562376502-6f769499c886?auto=format&fit=crop&w=500&q=80" },
  { name: "Fluffy Stacked Pancakes", basePrice: 220, isVeg: true, desc: "Three stacked fluffy buttermilk pancakes drizzled with pure maple syrup and butter.", imageUrl: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80" },
  { name: "Sourdough Avocado Toast", basePrice: 260, isVeg: true, desc: "Toasted sourdough bread topped with crushed avocado, poached egg, chili flakes, and microgreens.", imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=80" },
  { name: "Three-Egg Cheese Omelette", basePrice: 190, isVeg: false, desc: "Fluffy 3-egg omelette stuffed with sharp cheddar, bell peppers, mushrooms, served with hash browns.", imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=80" },
  { name: "Brioche French Toast", basePrice: 230, isVeg: true, desc: "Thick sliced brioche soaked in vanilla cinnamon custard, pan fried and dusted with powdered sugar.", imageUrl: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80" },
  { name: "Berry Granola Yogurt Parfait", basePrice: 180, isVeg: true, desc: "Layers of Greek yogurt, honey, toasted oat granola, and fresh blueberry raspberry parfait.", imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=500&q=80" },
  { name: "Crispy Golden Hash Browns (3pcs)", basePrice: 130, isVeg: true, desc: "Shredded potatoes fried until golden and extra crispy.", imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80" },
  { name: "Smoked Salmon Bagel", basePrice: 380, isVeg: false, desc: "Toasted bagel spread with herb cream cheese, sliced smoked salmon, capers, and red onion.", imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=80" },
  { name: "Full English Breakfast Platter", basePrice: 420, isVeg: false, desc: "Sunny side up eggs, pork sausages, crispy bacon, grilled tomato, baked beans, toast, and hash brown.", imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=80" }
];

const breakfastItems = createProductList("bf", breakfastBase);

module.exports = breakfastItems;
