const { createProductList } = require('./dataHelper');

const streetFoodBase = [
  { name: "Delhi Style Pani Puri (8pcs)", basePrice: 110, isVeg: true, desc: "Crispy hollow puris filled with spiced potato chickpea mash and spicy mint water.", imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80" },
  { name: "Special Dahi Sev Puri", basePrice: 130, isVeg: true, desc: "Flat puris topped with potatoes, sweetened yogurt, tamarind chutney, and crunchy sev.", imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80" },
  { name: "Butter Pav Bhaji Supreme", basePrice: 170, isVeg: true, desc: "Mashed vegetable curry cooked with special spices and butter, served with two buttered pavs.", imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80" },
  { name: "Aloo Tikki Chole Chaat", basePrice: 140, isVeg: true, desc: "Crispy potato patties topped with spicy chickpea curry, sweet yogurt, chutneys, and pomegranate.", imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80" },
  { name: "Mumbai Vada Pav Double", basePrice: 90, isVeg: true, desc: "Spiced potato dumpling fried in chickpea batter inside soft bun with garlic chili chutney.", imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80" },
  { name: "Kolkata Paneer Kathi Roll", basePrice: 160, isVeg: true, desc: "Paratha wrapped around grilled spicy paneer cubes, onions, green chilies, and lemon juice.", imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=80" },
  { name: "Kolkata Double Egg Chicken Roll", basePrice: 190, isVeg: false, desc: "Flaky paratha coated with egg and filled with spiced juicy chicken strips and pickled onions.", imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=80" },
  { name: "Raj Kachori Royal Chaat", basePrice: 180, isVeg: true, desc: "Giant crisp sphere stuffed with sprouted moong, boiled potatoes, yogurt, and pomegranate.", imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80" },
  { name: "Chole Kulche Amritsari", basePrice: 160, isVeg: true, desc: "Tangy chickpea curry served with soft coriander baked kulchas and lemon chili pickles.", imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80" },
  { name: "Bhel Puri Beach Style", basePrice: 100, isVeg: true, desc: "Puffed rice tossed with roasted peanuts, raw mango, tomatoes, onions, and sweet chili chutneys.", imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80" },
  { name: "Kutchhi Dabeli (2pcs)", basePrice: 110, isVeg: true, desc: "Sweet and spicy potato mash stuffed in pav with pomegranate, roasted peanuts, and sev.", imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80" },
  { name: "Dahi Vada Sweet Yogurt (2pcs)", basePrice: 130, isVeg: true, desc: "Lentil dumplings soaked in chilled sweet yogurt, tamarind chutney, and roasted cumin.", imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80" }
];

const streetFoodItems = createProductList("sf", streetFoodBase);

module.exports = streetFoodItems;
