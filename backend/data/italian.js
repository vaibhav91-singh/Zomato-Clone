const { createProductList } = require('./dataHelper');

const italianBase = [
  { name: "Margherita Classica Pizza", basePrice: 360, isVeg: true, desc: "San Marzano tomato base, fresh buffalo mozzarella, fresh basil leaves, and cold-pressed extra virgin olive oil.", imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80" },
  { name: "Fiery Pepperoni Feast Pizza", basePrice: 490, isVeg: false, desc: "Rich tomato sauce, stringy mozzarella, spicy pork pepperoni, jalapeños, and chili honey drizzle.", imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80" },
  { name: "Truffle Mushroom Pizza", basePrice: 440, isVeg: true, desc: "White sauce base, fontina cheese, portobello & button mushrooms, finished with pure white truffle oil.", imageUrl: "https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?auto=format&fit=crop&w=500&q=80" },
  { name: "Fettuccine Creamy Alfredo", basePrice: 380, isVeg: true, desc: "Flat pasta ribbons tossed in a rich sauce of heavy cream, white butter, and aged Parmigiano-Reggiano.", imageUrl: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=500&q=80" },
  { name: "Penne All'Arrabbiata Chicken", basePrice: 420, isVeg: false, desc: "Penne pasta and grilled chicken tossed in fiery spicy tomato sauce with garlic, chili flakes, and black olives.", imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80" },
  { name: "Four Cheese Gourmet Pizza", basePrice: 460, isVeg: true, desc: "Mozzarella, Gorgonzola, Ricotta, and aged Parmesan baked on thin sourdough crust.", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80" },
  { name: "Classic Garlic Herb Bread", basePrice: 190, isVeg: true, desc: "Artisanal baguette baked with herb garlic butter and melted mozzarella cheese.", imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80" },
  { name: "Wild Mushroom Risotto", basePrice: 410, isVeg: true, desc: "Arborio rice slow-cooked with porcini stock, white wine, butter, and thyme.", imageUrl: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=500&q=80" },
  { name: "Lasagna Bolognese Mutton", basePrice: 480, isVeg: false, desc: "Layered pasta sheets stuffed with minced mutton ragu, béchamel, and baked mozzarella crust.", imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80" },
  { name: "Pesto Basil Spaghetti", basePrice: 370, isVeg: true, desc: "Al dente spaghetti tossed in fresh Genovese pine nut basil pesto and cherry tomatoes.", imageUrl: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=500&q=80" },
  { name: "Bruschetta Pomodoro", basePrice: 220, isVeg: true, desc: "Toasted Italian bread topped with marinated diced tomatoes, fresh basil, and extra virgin olive oil.", imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80" },
  { name: "Baked Spinach Ricotta Calzone", basePrice: 390, isVeg: true, desc: "Folded pizza crust stuffed with sautéed spinach, ricotta cheese, and marinara dip.", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80" }
];

const italianItems = createProductList("it", italianBase);

module.exports = italianItems;
