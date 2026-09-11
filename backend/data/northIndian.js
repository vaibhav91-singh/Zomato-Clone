const { createProductList } = require('./dataHelper');

const northIndianBase = [
  { name: "Paneer Tikka Shashlik", basePrice: 280, isVeg: true, desc: "Cottage cheese cubes marinated in spiced yogurt, skewered with bell peppers and char-grilled.", imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80" },
  { name: "Murgh Malai Tikka", basePrice: 340, isVeg: false, desc: "Creamy chicken chunks marinated in cream, cheese, cardamom, and grilled in tandoor.", imageUrl: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80" },
  { name: "Dal Makhani Double Cream", basePrice: 320, isVeg: true, desc: "Slow-cooked black lentils overnight with tomato puree, white butter, and fresh cream.", imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80" },
  { name: "Butter Chicken Masala", basePrice: 390, isVeg: false, desc: "Tandoori chicken tikkas simmered in smooth, mildly sweet tomato cashew gravy.", imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80" },
  { name: "Premium Veg Dum Biryani", basePrice: 350, isVeg: true, desc: "Fragrant basmati rice layered with garden vegetables, slow-cooked in dum style with saffron.", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80" },
  { name: "Chicken Hyderabadi Dum Biryani", basePrice: 420, isVeg: false, desc: "Authentic long-grain rice layered with marinated chicken, caramelized onions, and fried mint.", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80" },
  { name: "Palak Paneer Gravy", basePrice: 310, isVeg: true, desc: "Fresh cottage cheese cubes cooked in garlic-infused spinach puree with light cream.", imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80" },
  { name: "Mutton Rogan Josh", basePrice: 480, isVeg: false, desc: "Tender mutton braised in Kashmiri chili gravy enriched with dried ginger and fennel.", imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80" },
  { name: "Kadhai Paneer Special", basePrice: 330, isVeg: true, desc: "Cottage cheese tossed with crushed coriander seeds, capsicum, and spicy onion tomato gravy.", imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80" },
  { name: "Amritsari Chole Bhature", basePrice: 220, isVeg: true, desc: "Spiced chickpea curry served with two fluffy puffed bhaturas, pickled chili, and onions.", imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80" },
  { name: "Butter Garlic Naan", basePrice: 80, isVeg: true, desc: "Soft clay-oven baked flatbread infused with minced garlic and brushed with white butter.", imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80" },
  { name: "Malai Kofta Gravy", basePrice: 340, isVeg: true, desc: "Crispy cottage cheese and potato dumplings stuffed with nuts, simmered in rich cashew gravy.", imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80" }
];

const northIndianItems = createProductList("ni", northIndianBase);

module.exports = northIndianItems;
