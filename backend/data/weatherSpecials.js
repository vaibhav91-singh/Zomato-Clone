const weatherSpecialItems = [
  {
    id: "ws_1",
    name: "☕ Sizzling Hot Kulhad Masala Chai (2 Cups)",
    price: 90,
    description: "Brewed with fresh ginger, cardamom, clove and whole spices, served steaming hot in traditional clay cups.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_2",
    name: "🥟 Steaming Hot Butter Steamed Momos (8 pcs)",
    price: 180,
    description: "Piping hot thin-crust dumplings stuffed with juicy filling, served with fiery red garlic chutney & mayonnaise.",
    category: "Weather Specials",
    isVeg: false,
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_3",
    name: "🥔 Golden Crunchy Punjabi Samosas (4 pcs)",
    price: 110,
    description: "Super crispy golden pastry stuffed with spicy potato & green pea filling, served with sweet tamarind & mint chutney.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_4",
    name: "🧅 Crispy Onion & Paneer Pakora Platter",
    price: 190,
    description: "Deep fried crispy fritters dipped in spiced gram flour batter, served piping hot with green chutney and chai combo.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_5",
    name: "🍟 Loaded Sizzling Cheese Fries",
    price: 210,
    description: "Extra crunchy golden fries smothered in hot liquid cheddar cheese, jalapenos and peri peri spice mix.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_6",
    name: "🍗 Extra Crunchy Peri-Peri Fried Chicken Strips (6 pcs)",
    price: 290,
    description: "Double battered ultra-crispy chicken tenders dusted with spicy peri-peri dust and served with garlic dip.",
    category: "Weather Specials",
    isVeg: false,
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_7",
    name: "🍜 Hot & Sour Spicy Manchurian Noodle Bowl",
    price: 240,
    description: "Steaming bowl of spicy noodles cooked in garlic gravy with crispy veggie manchurian balls.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_8",
    name: "🍞 Butter Roasted Pav Bhaji Deluxe",
    price: 200,
    description: "Thick spicy mashed vegetable curry topped with a dollop of fresh butter, served with soft roasted pav rolls.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_9",
    name: "🍨 Hot Chocolate Lava Cake with Ice Cream",
    price: 170,
    description: "Warm chocolate cake with a molten liquid center paired with a scoop of vanilla ice cream.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_10",
    name: "🍲 Hot Sweet Corn & Chicken Noodle Soup",
    price: 160,
    description: "Comforting thick soup packed with sweet corn kernels, tender chicken shreds, and cracked black pepper.",
    category: "Weather Specials",
    isVeg: false,
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_11",
    name: "🧀 Hot Melting Cheese Corn Garlic Bread (4 pcs)",
    price: 190,
    description: "Oven baked crispy garlic baguettes loaded with mozzarella cheese and sweet corn.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"

  },
  {
    id: "ws_12",
    name: "🍧 Piping Hot Desi Ghee Jalebi with Rabri",
    price: 180,
    description: "Crispy spiral jalebis soaked in saffron sugar syrup, served hot with thick chilled rabri.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_13",
    name: "🌶️ Crispy Indo-Chinese Chilli Paneer Dry",
    price: 230,
    description: "Wok tossed cottage cheese cubes with bell peppers, spring onions and fiery chili garlic sauce.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_14",
    name: "🧆 Hot Amritsari Crispy Fish Fry / Veg Bites",
    price: 280,
    description: "Carom-seed spiced crispy fried fillets served with mint chutney and fresh lemon wedges.",
    category: "Weather Specials",
    isVeg: false,
    imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_15",
    name: "🫓 Hot Stuffed Aloo Pyaz Paratha with White Butter (2 pcs)",
    price: 160,
    description: "Tandoori tawa parathas generously stuffed with spiced potato-onion mix, served with dollop of fresh butter & pickle.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_16",
    name: "🥣 Creamy Hot Tomato Basil Soup with Garlic Croutons",
    price: 140,
    description: "Rich roasted tomato puree infused with fresh basil leaves, served with crunchy toasted butter croutons.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_17",
    name: "🧋 Rich Belgian Hot Chocolate with Marshmallows",
    price: 150,
    description: "Thick velvety dark chocolate beverage topped with fluffy marshmallows and cocoa dusting.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_18",
    name: "🥟 Extra Crispy Kurkure Fried Momos (8 pcs)",
    price: 210,
    description: "Crunchy cornflakes crusted fried dumplings served with mayo and spicy chili sauce.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_19",
    name: "🫔 Spicy Schezwan Veg Spring Rolls (6 pcs)",
    price: 180,
    description: "Ultra-thin crispy rolls packed with shredded veggies & spicy schezwan sauce.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_20",
    name: "🧀 Cheesy Melted Garlic Breadsticks with Jalapeno Dip",
    price: 170,
    description: "Warm pulled breadsticks coated in garlic butter and melted herbs, served with cheesy jalapeno dip.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"

  },
  {
    id: "ws_21",
    name: "🌽 Charcoal Roasted Masala Corn on the Cob",
    price: 80,
    description: "Fresh sweet corn roasted over open coals, brushed with butter, lime juice and spicy chaat masala.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_22",
    name: "🍗 Crispy Popcorn Chicken Bucket",
    price: 260,
    description: "Bite-sized tender chicken morsels fried to golden perfection with zesty seasoning.",
    category: "Weather Specials",
    isVeg: false,
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_23",
    name: "🥞 Warm Honey Butter Belgian Waffles with Vanilla Cream",
    price: 190,
    description: "Crispy grid waffles baked fresh, drizzled with warm honey, melted butter and vanilla cream.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_24",
    name: "☕ Sizzling Hot Cinnamon Cappuccino",
    price: 130,
    description: "Espresso shot blended with steamed foamy milk and sprinkled with aromatic ground cinnamon.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_25",
    name: "🍲 Hot Himalayan Thukpa Noodle Soup",
    price: 190,
    description: "Traditional Tibetan clear noodle soup loaded with veggies, ginger, garlic and aromatic broth.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_26",
    name: "🥖 Oven Baked Crispy Loaded Nachos Supreme",
    price: 220,
    description: "Crispy tortilla chips piled high with warm queso, black beans, salsa and sour cream.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_27",
    name: "🍢 Hot Clay Oven Tandoori Paneer Tikka (6 pcs)",
    price: 270,
    description: "Smoky cottage cheese cubes marinated in spiced hung curd and charred in clay tandoor.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_28",
    name: "🍲 Sizzling Hot Fudgy Brownie with Hot Fudge",
    price: 180,
    description: "Served on a piping iron sizzler plate with warm chocolate syrup drizzle.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_29",
    name: "🥟 Spicy Chili Garlic Steamed Dimsums (8 pcs)",
    price: 190,
    description: "Handcrafted translucent dumplings tossed in dark chili garlic oil and scallions.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ws_30",
    name: "🍵 Hot Kulhad Adrak Elaichi Chai & Bun Maska Combo",
    price: 120,
    description: "Steaming hot ginger-cardamom tea paired with soft toasted bun slathered in salted butter.",
    category: "Weather Specials",
    isVeg: true,
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  }
];

module.exports = weatherSpecialItems;
