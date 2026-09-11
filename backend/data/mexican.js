const { createProductList } = require('./dataHelper');

const mexicanBase = [
  { name: "Baja Crispy Fish Tacos (3pcs)", basePrice: 340, isVeg: false, desc: "Soft corn tortillas filled with beer-battered fish, shredded cabbage, and chipotle lime crema.", imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=80" },
  { name: "Cheesy Chipotle Burrito Bowl", basePrice: 310, isVeg: true, desc: "Cilantro lime rice, black beans, grilled veggies, fresh guacamole, and Monterey Jack cheese.", imageUrl: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=500&q=80" },
  { name: "Three Cheese Quesadilla Supreme", basePrice: 280, isVeg: true, desc: "Crispy grilled flour tortilla packed with melted cheddar, mozzarella, and roasted jalapeños.", imageUrl: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=500&q=80" },
  { name: "Smoky Pulled Pork Burrito", basePrice: 380, isVeg: false, desc: "Giant flour tortilla stuffed with slow-cooked carnitas, pinto beans, salsa verde, and sour cream.", imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=80" },
  { name: "Ultimate Loaded Nachos Fiesta", basePrice: 260, isVeg: true, desc: "Crunchy corn tortilla chips covered in warm queso, pico de gallo, pickled jalapeños, and guac.", imageUrl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=500&q=80" },
  { name: "Grilled Chicken Chimichanga", basePrice: 350, isVeg: false, desc: "Deep-fried golden burrito packed with spiced chicken, bell peppers, and topped with melted cheese.", imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=80" },
  { name: "Fresh Guacamole & Chips Plate", basePrice: 190, isVeg: true, desc: "Hand-mashed Hass avocados mixed with lime juice, cilantro, onions, served with tortilla chips.", imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80" },
  { name: "Chipotle Paneer Fajitas", basePrice: 320, isVeg: true, desc: "Sizzling skillet of spiced cottage cheese strips, onions, peppers served with warm tortillas.", imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=80" },
  { name: "Mexican Churros with Chocolate", basePrice: 190, isVeg: true, desc: "Crispy fried pastry dusted with cinnamon sugar and served with hot Mexican dark chocolate sauce.", imageUrl: "https://images.unsplash.com/photo-1624371414361-e670edf4898d?auto=format&fit=crop&w=500&q=80" },
  { name: "Spicy Salsa & Corn Dip", basePrice: 130, isVeg: true, desc: "Charred sweet corn salsa mixed with black beans, lime, chilies, and red onion.", imageUrl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=500&q=80" }
];

const mexicanItems = createProductList("mx", mexicanBase);

module.exports = mexicanItems;
