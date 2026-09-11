const { createProductList } = require('./dataHelper');

const beveragesBase = [
  { name: "Cold Brew Iced Americano", basePrice: 150, isVeg: true, desc: "18-hour slow steeped arabica coffee over ice with a hint of citrus.", imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80" },
  { name: "Alphonso Mango Lassi", basePrice: 130, isVeg: true, desc: "Creamy yogurt blended with rich Alphonso mango pulp and cardamom.", imageUrl: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=500&q=80" },
  { name: "Nutella Chocolate Cold Coffee", basePrice: 180, isVeg: true, desc: "Espresso shot blended with hazelnut Nutella spread, whole milk, and topped with whipped cream.", imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80" },
  { name: "Sparkling Mint Virgin Mojito", basePrice: 140, isVeg: true, desc: "Fresh muddled mint leaves, lime wedges, simple syrup, topped with sparkling soda over crushed ice.", imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80" },
  { name: "Taro Brown Sugar Boba Milk Tea", basePrice: 210, isVeg: true, desc: "Sweet taro root tea with chewy tapioca pearls and brown sugar drizzle.", imageUrl: "https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=500&q=80" },
  { name: "Cold Pressed Orange Ginger Juice", basePrice: 160, isVeg: true, desc: "100% pure cold-pressed Nagpur oranges with a spicy kick of fresh ginger juice.", imageUrl: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80" },
  { name: "Kyoto Iced Matcha Latte", basePrice: 220, isVeg: true, desc: "Ceremonial grade Japanese green tea matcha whisked with oat milk and agave nectar.", imageUrl: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=500&q=80" },
  { name: "Strawberry Basil Lemonade", basePrice: 150, isVeg: true, desc: "Hand-squeezed lemon juice infused with fresh strawberry puree and bruised basil leaves.", imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80" },
  { name: "Oreo Cookie Monster Shake", basePrice: 190, isVeg: true, desc: "Vanilla gelato blended with crushed Oreo cookies, topped with chocolate fudge and extra Oreos.", imageUrl: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=500&q=80" },
  { name: "Masala Chai Flask (500ml)", basePrice: 120, isVeg: true, desc: "Boiled strong Assam black tea infused with ginger, cardamom, clove, and fresh milk.", imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80" }
];

const beveragesItems = createProductList("bv", beveragesBase);

module.exports = beveragesItems;
