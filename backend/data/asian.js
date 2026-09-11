const { createProductList } = require('./dataHelper');

const asianBase = [
  { name: "Crystal Veg Dumplings (6pcs)", basePrice: 240, isVeg: true, desc: "Translucent steamed dumplings stuffed with finely chopped exotic vegetables and wild mushrooms.", imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=500&q=80" },
  { name: "Chicken Pan-Fried Gyoza (6pcs)", basePrice: 290, isVeg: false, desc: "Japanese style crescent dumplings filled with spiced minced chicken, crispy bottom.", imageUrl: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=500&q=80" },
  { name: "Ninja Veg Hakka Noodles", basePrice: 220, isVeg: true, desc: "Stir-fried noodles with crisp colorful veggies, spring onions, and light soy sauce.", imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80" },
  { name: "Szechuan Chicken Fried Rice", basePrice: 280, isVeg: false, desc: "Spicy rice tossed with egg, tender chicken pieces, and signature hot Szechuan paste.", imageUrl: "https://images.unsplash.com/photo-1603133872878-685f5888c308?auto=format&fit=crop&w=500&q=80" },
  { name: "Thai Green Curry (Veg)", basePrice: 330, isVeg: true, desc: "Fragrant coconut milk curry with broccoli, zucchini, baby corn, served with steamed jasmine rice.", imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=500&q=80" },
  { name: "Chili Garlic Crispy Noodles", basePrice: 230, isVeg: true, desc: "Crispy noodles coated in garlic chili sauce with scallions and crushed sesame.", imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80" },
  { name: "Kung Pao Chicken Wok", basePrice: 350, isVeg: false, desc: "Diced chicken wok-tossed with roasted peanuts, dry red chilies, and tangy soy glaze.", imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=500&q=80" },
  { name: "Vegetable Manchurian Gravy", basePrice: 260, isVeg: true, desc: "Deep-fried veggie balls tossed in thick garlic, ginger, and soy dark gravy sauce.", imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=500&q=80" },
  { name: "Pad Thai Shrimp Noodles", basePrice: 380, isVeg: false, desc: "Flat rice noodles stir-fried with juicy prawns, bean sprouts, crushed peanuts, and tamarind glaze.", imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=500&q=80" },
  { name: "Hot & Sour Veg Soup", basePrice: 170, isVeg: true, desc: "Peppery tangy vegetable soup loaded with bamboo shoots, tofu cubes, and black fungus.", imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=80" },
  { name: "Crispy Spring Rolls (4pcs)", basePrice: 210, isVeg: true, desc: "Golden fried rolls stuffed with shredded glass noodles, cabbage, carrots, served with sweet chili sauce.", imageUrl: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=500&q=80" },
  { name: "Teriyaki Tofu Stir-Fry", basePrice: 290, isVeg: true, desc: "Crispy tofu cubes stir-fried with broccoli, snap peas, and sweet soy glaze.", imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" }
];

const asianItems = createProductList("as", asianBase);

module.exports = asianItems;
