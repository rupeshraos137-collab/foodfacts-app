function FoodCard({ product }) {
  const {
    product_name,
    brands,
    nutriments,
    image_small_url
  } = product;

  return (
    <div className="food-card">
      {/* Image */}
      <img
        src={image_small_url || "https://via.placeholder.com/100"}
        alt={product_name || "No Image"}
      />

      {/* Name */}
      <h2>{product_name || "Unknown Product"}</h2>

      {/* Brand */}
      <p>{brands || "Unknown Brand"}</p>

      {/* Nutrition */}
      <p>Calories: {nutriments?.["energy-kcal_100g"] ?? "N/A"} kcal</p>
      <p>Protein: {nutriments?.proteins_100g ?? "N/A"} g</p>
      <p>Carbs: {nutriments?.carbohydrates_100g ?? "N/A"} g</p>
      <p>Fat: {nutriments?.fat_100g ?? "N/A"} g</p>
    </div>
  );
}

export default FoodCard;