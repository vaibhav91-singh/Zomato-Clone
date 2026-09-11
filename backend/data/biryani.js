const { createProductList } = require('./dataHelper');

const biryaniBase = [
  { name: "Hyderabadi Dum Mutton Biryani", basePrice: 450, isVeg: false, desc: "Fragrant basmati rice layered with succulent mutton, caramelized mint, and fried onions.", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80" },
  { name: "Lucknowi Murgh Dum Biryani", basePrice: 390, isVeg: false, desc: "Awadhi style delicate basmati rice slow-cooked with bone-in chicken and kewra water.", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80" },
  { name: "Kolkata Egg Potato Biryani", basePrice: 280, isVeg: false, desc: "Aromatic yellow basmati rice cooked with boiled eggs, soft golden potatoes, and mace.", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80" },
  { name: "Galouti Mutton Kebab (4pcs)", basePrice: 420, isVeg: false, desc: "Melt-in-mouth minced mutton patties infused with 160 herbs and spices, pan fried in ghee.", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80" },
  { name: "Paneer Tikka Dum Biryani", basePrice: 340, isVeg: true, desc: "Char-grilled spicy cottage cheese cubes layered with saffron long-grain basmati rice.", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80" },
  { name: "Murgh Seekh Kebab (6pcs)", basePrice: 360, isVeg: false, desc: "Minced chicken seasoned with coriander, green chilies, skewered and cooked over hot charcoal.", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80" },
  { name: "Tangdi Kebab Roasted (2pcs)", basePrice: 370, isVeg: false, desc: "Chicken drumsticks marinated in spicy tandoori masala, yogurt, and chargrilled.", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80" },
  { name: "Veg Soya Chaap Biryani", basePrice: 320, isVeg: true, desc: "Tender marinated soya chaap pieces layered in aromatic dum rice with raita.", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80" },
  { name: "Mirchi Ka Salan Bowl", basePrice: 160, isVeg: true, desc: "Spicy sesame peanut gravy cooked with charred green chilies, classic biryani side dish.", imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80" },
  { name: "Boondi Burani Raita", basePrice: 90, isVeg: true, desc: "Chilled garlic yogurt mixed with crispy boondi and roasted cumin powder.", imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80" },
  { name: "Reshmi Murgh Malai Kebab", basePrice: 390, isVeg: false, desc: "Tender boneless chicken marinated in cashew cream and egg white, char-grilled.", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80" },
  { name: "Tandoori Kathi Roll (Chicken)", basePrice: 220, isVeg: false, desc: "Flaky rumali rotis stuffed with tandoori chicken boti, mint chutney, and raw onions.", imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=80" }
];

const biryaniItems = createProductList("by", biryaniBase);

module.exports = biryaniItems;
