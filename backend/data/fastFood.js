const { createProductList } = require('./dataHelper');

const fastFoodBase = [
  { name: "Ultimate Cheesy Crunch Burger", basePrice: 190, isVeg: true, desc: "Super crispy cheese-oozing mixed veg patty, liquid cheddar, lettuce, onions, in brioche buns.", imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80" },
  { name: "Double Smash Bacon Burger", basePrice: 290, isVeg: false, desc: "Two crispy smashed beef/mutton patties, melted American cheese, crispy bacon, house secret spread.", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
  { name: "Gourmet Truffle Fries", basePrice: 150, isVeg: true, desc: "Golden french fries tossed with sea salt, grated parmesan, herbs, and pure truffle essence.", imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80" },
  { name: "Salted Caramel Waffle Shake", basePrice: 180, isVeg: true, desc: "Vanilla gelato blended with rich salted caramel, topped with whipped cream and waffle bits.", imageUrl: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=500&q=80" },
  { name: "Fiery Crispy Chicken Wings (8pcs)", basePrice: 270, isVeg: false, desc: "Juicy chicken wings coated in spicy hot buffalo glaze served with ranch dip.", imageUrl: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80" },
  { name: "Mexican Loaded Nachos Supreme", basePrice: 210, isVeg: true, desc: "Tortilla chips loaded with warm queso, jalapeños, black beans, guacamole, and sour cream.", imageUrl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=500&q=80" },
  { name: "Crispy Paneer Maharaja Wrap", basePrice: 180, isVeg: true, desc: "Crispy marinated paneer strip wrapped with chipotle mayo, crunchy lettuce, and onions.", imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=80" },
  { name: "Smoky BBQ Pulled Chicken Slider", basePrice: 240, isVeg: false, desc: "Slow cooked pulled chicken in hickory BBQ sauce with coleslaw in miniature potato buns.", imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80" },
  { name: "Belgian Chocolate Thick Shake", basePrice: 190, isVeg: true, desc: "Rich dark Belgian chocolate ice cream shake topped with chocolate shavings and fudge syrup.", imageUrl: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=500&q=80" },
  { name: "Crispy Golden Onion Rings", basePrice: 140, isVeg: true, desc: "Thick cut onion rings beer-battered and fried crispy, served with garlic aioli.", imageUrl: "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=500&q=80" },
  { name: "Mozzarella Cheese Sticks (6pcs)", basePrice: 170, isVeg: true, desc: "Crispy breaded mozzarella sticks oozing with warm cheese, served with marinara dip.", imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80" },
  { name: "Crispy Chicken Tenders (5pcs)", basePrice: 230, isVeg: false, desc: "Hand-breaded juicy chicken breast strips fried crisp with honey mustard sauce.", imageUrl: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80" }
];

const fastFoodItems = createProductList("ff", fastFoodBase);

module.exports = fastFoodItems;
