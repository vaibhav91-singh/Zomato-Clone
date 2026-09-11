const { createProductList } = require('./dataHelper');

const southIndianBase = [
  { name: "Mysore Masala Dosa", basePrice: 180, isVeg: true, desc: "Crispy crepe smeared with spicy red garlic chutney and stuffed with spiced potato mash.", imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80" },
  { name: "Steamed Button Idli Sambar", basePrice: 130, isVeg: true, desc: "Mini fluffy rice cakes submerged in hot aromatic lentil sambar and coconut chutney.", imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80" },
  { name: "Crispy Medu Vada (2pcs)", basePrice: 140, isVeg: true, desc: "Golden fried savory lentil donuts seasoned with black pepper, curry leaves, and ginger.", imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80" },
  { name: "Onion Rava Dosa", basePrice: 190, isVeg: true, desc: "Lacy, ultra-crispy semolina crepe topped with chopped onions, green chilies, and cumin.", imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80" },
  { name: "Cheese Butter Masala Dosa", basePrice: 210, isVeg: true, desc: "Classic masala dosa loaded with melted cheddar cheese and Amul butter.", imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80" },
  { name: "Degree Filter Coffee", basePrice: 70, isVeg: true, desc: "Traditional South Indian chicory coffee brewed with frothed milk in brass tumbler.", imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80" },
  { name: "Chettinad Spicy Chicken Curry", basePrice: 380, isVeg: false, desc: "Fiery Tamil Nadu style chicken cooked with roasted star anise, poppy seeds, and coconut.", imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80" },
  { name: "Tangy Lemon Rice Special", basePrice: 150, isVeg: true, desc: "Tempered rice with fresh lemon juice, mustard seeds, peanuts, and curry leaves.", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80" },
  { name: "Tomato Onion Uttapam", basePrice: 170, isVeg: true, desc: "Thick savory pancake topped with juicy tomatoes, onions, cilantro, and green chilies.", imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80" },
  { name: "Hydrating Curd Rice", basePrice: 140, isVeg: true, desc: "Soft rice blended with cool yogurt, tempered with mustard seeds, pomegranate seeds, and curry leaves.", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80" },
  { name: "Paper Thin Plain Dosa", basePrice: 150, isVeg: true, desc: "Extra long wafer-thin fermented rice crepe served with 3 signature chutneys.", imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80" },
  { name: "Paneer Butter Masala Dosa", basePrice: 220, isVeg: true, desc: "Crispy crepe stuffed with spicy grated cottage cheese masala and white butter.", imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80" }
];

const southIndianItems = createProductList("si", southIndianBase);

module.exports = southIndianItems;
