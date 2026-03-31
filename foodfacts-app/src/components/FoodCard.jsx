import { useNavigate } from "react-router-dom";

function FoodCard({ product }) {
  const navigate = useNavigate();

  const {
    product_name,
    brands,
    image_small_url,
    nutriments,
    code
  } = product;

  return (
    <div
      className="food-card"
      onClick={() => navigate(`/product/${code}`)}
    >
      {/* Image */}
      <div className="food-img">
        <img
          src={image_small_url || "https://via.placeholder.com/150"}
          alt={product_name || "Food"}
        />
      </div>

      {/* Content */}
      <div className="food-info">
        <h3>{product_name || "Unknown Product"}</h3>
        <p className="brand">{brands || "Unknown Brand"}</p>

        <div className="nutrition">
          <span>
            🔥 {nutriments?.["energy-kcal_100g"] ?? "N/A"} kcal
          </span>
          <span>
            💪 {nutriments?.proteins_100g ?? "N/A"}g
          </span>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;