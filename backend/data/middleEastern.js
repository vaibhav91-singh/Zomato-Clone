const { createProductList } = require('./dataHelper');

const middleEasternBase = [
  { name: "Classic Chicken Shawarma Wrap", basePrice: 220, isVeg: false, desc: "Shredded rotisserie chicken, toum garlic sauce, pickled cucumbers in warm pita bread.", imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=80" },
  { name: "Crispy Falafel Hummus Platter", basePrice: 260, isVeg: true, desc: "Golden fried chickpea falafels served with smooth tahini hummus, pickles, and pita.", imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80" },
  { name: "Chargrilled Shish Taouk Skewers", basePrice: 380, isVeg: false, desc: "Yogurt and garlic marinated chicken breast cubes grilled over charcoal served with toum.", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80" },
  { name: "Lamb Doner Kebab Plate", basePrice: 420, isVeg: false, desc: "Thinly sliced seasoned lamb served over saffron rice, roasted tomatoes, and yogurt dip.", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80" },
  { name: "Smoky Babaganoush & Pita", basePrice: 190, isVeg: true, desc: "Fire-roasted eggplant puree mixed with tahini, olive oil, garlic, and pomegranate seeds.", imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80" },
  { name: "Royal Turkish Baklava (4pcs)", basePrice: 240, isVeg: true, desc: "Crispy layered phyllo pastry filled with chopped pistachios and soaked in honey syrup.", imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=80" },
  { name: "Lebanese Fattoush Salad", basePrice: 210, isVeg: true, desc: "Mixed greens, radishes, cucumbers, pomegranate seeds, crisp fried pita chips, sumac dressing.", imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80" },
  { name: "Kofta Kebab Skewers (Lamb)", basePrice: 440, isVeg: false, desc: "Minced lamb mixed with parsley, onions, Middle Eastern spices, char-grilled.", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80" },
  { name: "Cheesy Haloumi Fries", basePrice: 250, isVeg: true, desc: "Thick cut halloumi cheese golden fried served with sweet chili za'atar dip.", imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80" },
  { name: "Spiced Lentil Soup (Shorba)", basePrice: 160, isVeg: true, desc: "Warm yellow lentil soup tempered with cumin, lemon juice, and crispy pita croutons.", imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=80" }
];

const middleEasternItems = createProductList("me", middleEasternBase);

module.exports = middleEasternItems;
