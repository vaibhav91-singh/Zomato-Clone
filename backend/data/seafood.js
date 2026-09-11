const { createProductList } = require('./dataHelper');

const seafoodBase = [
  { name: "Butter Garlic Tiger Prawns", basePrice: 480, isVeg: false, desc: "Jumbo tiger prawns sautéed in garlic, white wine butter sauce, and fresh parsley.", imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=500&q=80" },
  { name: "Goan Fish Curry Special", basePrice: 420, isVeg: false, desc: "Tender kingfish cooked in a tangy spicy coconut tamarind gravy served with steamed rice.", imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80" },
  { name: "Crispy Calamari Rings", basePrice: 380, isVeg: false, desc: "Tender squid rings coated in seasoned batter, crispy fried, served with garlic aioli.", imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=500&q=80" },
  { name: "Amritsari Crispy Fried Fish", basePrice: 390, isVeg: false, desc: "Carom-seed spiced river fish fillets batter-fried crispy served with mint chutney.", imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80" },
  { name: "Chargrilled Salmon Steak", basePrice: 590, isVeg: false, desc: "Fresh Norwegian salmon fillet grilled over open flame served with lemon dill butter.", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80" },
  { name: "Crab Masala Chettinad", basePrice: 460, isVeg: false, desc: "Mud crab cooked in peppery South Indian roasted spice coconut gravy.", imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=500&q=80" },
  { name: "Tandoori Fish Tikka", basePrice: 410, isVeg: false, desc: "Boneless fish cubes marinated in red chili yogurt and mustard oil, charred in tandoor.", imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80" },
  { name: "Seafood Paella Valenciana", basePrice: 520, isVeg: false, desc: "Spanish saffron rice cooked with prawns, mussels, calamari, and bell peppers.", imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80" },
  { name: "Steamed Lobster Herb Butter", basePrice: 650, isVeg: false, desc: "Whole lobster steamed to perfection and brushed with melted garlic herb butter.", imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=500&q=80" },
  { name: "Shrimp Cocktail Salad", basePrice: 320, isVeg: false, desc: "Poached chilled prawns served over crisp iceberg lettuce with tangy cocktail sauce.", imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=500&q=80" }
];

const seafoodItems = createProductList("sf", seafoodBase);

module.exports = seafoodItems;
