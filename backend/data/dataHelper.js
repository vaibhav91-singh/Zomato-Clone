// Helper function to create 12-15 distinct curated products per category
function createProductList(prefix, itemsBase) {
  return itemsBase.map((item, idx) => ({
    id: `${prefix}_${idx + 1}`,
    name: item.name,
    price: item.basePrice || item.price,
    rating: item.rating || parseFloat((4.3 + (idx % 7) / 10).toFixed(1)),
    description: item.desc || item.description,
    isVeg: item.isVeg !== undefined ? item.isVeg : true,
    isBestseller: idx % 3 === 0,
    imageUrl: item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
  }));
}

module.exports = {
  createProductList
};
