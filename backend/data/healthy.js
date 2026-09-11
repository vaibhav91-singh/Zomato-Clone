const { createProductList } = require('./dataHelper');

const healthyBase = [
  { name: "Avocado Quinoa Power Bowl", basePrice: 290, isVeg: true, desc: "Tri-color quinoa, sliced avocado, edamame, cherry tomatoes, and lemon tahini dressing.", imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80" },
  { name: "Greek Feta Mediterranean Salad", basePrice: 260, isVeg: true, desc: "Crisp romaine, cucumbers, kalamata olives, bell peppers, feta cheese, and oregano vinaigrette.", imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80" },
  { name: "Acai Berry Smoothie Bowl", basePrice: 320, isVeg: true, desc: "Blended acai berry base topped with chia seeds, sliced bananas, toasted granola, and coconut flakes.", imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=500&q=80" },
  { name: "Grilled Herb Chicken Caesar", basePrice: 310, isVeg: false, desc: "Chargrilled chicken breast over crunchy romaine lettuce, parmesan shavings, and garlic croutons.", imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80" },
  { name: "Roasted Harvest Veggie Bowl", basePrice: 270, isVeg: true, desc: "Roasted sweet potato, broccoli florets, chickpeas, and brown rice with peanut satay dip.", imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" },
  { name: "Protein Poke Salmon Bowl", basePrice: 420, isVeg: false, desc: "Fresh sashim-grade salmon, sushi rice, avocado, cucumber, seaweed, and ponzu soy sauce.", imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" },
  { name: "Detox Green Wellness Juice", basePrice: 140, isVeg: true, desc: "Cold-pressed green juice with spinach, celery, green apple, cucumber, and ginger.", imageUrl: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80" },
  { name: "Mediterranean Hummus & Pita", basePrice: 220, isVeg: true, desc: "Creamy chickpea hummus drizzled with olive oil served with warm whole-wheat pita pockets.", imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80" },
  { name: "Wild Berry Protein Smoothie", basePrice: 190, isVeg: true, desc: "Plant protein powder blended with blueberries, strawberries, almond milk, and honey.", imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=500&q=80" },
  { name: "Smoked Tofu Teriyaki Bowl", basePrice: 280, isVeg: true, desc: "Pan-seared organic tofu glazed in teriyaki sauce with steamed edamame and brown rice.", imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" },
  { name: "Crispy Kale & Apple Salad", basePrice: 240, isVeg: true, desc: "Tender kale leaves tossed with honeycrisp apples, candied walnuts, goat cheese, and cider vinaigrette.", imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80" },
  { name: "Chia Seed Almond Pudding", basePrice: 170, isVeg: true, desc: "Organic chia seeds soaked in almond milk, vanilla, topped with fresh mango slices.", imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=500&q=80" }
];

const healthyItems = createProductList("hb", healthyBase);

module.exports = healthyItems;
