import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  // helper to format values
  const format = (value) => {
    if (value === undefined || value === null) return "N/A";
    return Number(value).toFixed(1);
  };

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        if (!barcode) {
          setError("Invalid product barcode");
          return;
        }

        const res = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        );

        if (!cancelled) {
          if (res.data.status === 1) {
            setProduct(res.data.product);
          } else {
            setError("Product not found");
          }
        }
      } catch (err) {
        console.error("ERROR:", err);

        if (!cancelled) {
          setError("Network error. Check your internet.");
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [barcode]);

  // UI states
  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  const isSaved = saved.some((p) => p.code === barcode);

  const toggleSave = () => {
    if (isSaved) {
      dispatch({ type: "REMOVE", code: barcode });
    } else {
      dispatch({ type: "ADD", product });
    }
  };

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-header">
        {/* Image */}
        <img
          src={
            product.image_front_small_url ||
            "https://via.placeholder.com/150"
          }
          alt={product.product_name}
        />

        {/* Info */}
        <div>
          <h2>{product.product_name || "No Name"}</h2>
          <p className="brand">{product.brands || "Unknown Brand"}</p>

          <button className="save-btn" onClick={toggleSave}>
            {isSaved ? "★ Remove from Saved" : "☆ Save to My List"}
          </button>
        </div>
      </div>

      {/* Nutrition */}
      <div className="nutrition-table">
        <h3>Nutrition per 100g</h3>

        <div>
          <span>Calories</span>
          <span>{format(product.nutriments?.["energy-kcal_100g"])} kcal</span>
        </div>
        <div>
          <span>Protein</span>
          <span>{format(product.nutriments?.proteins_100g)} g</span>
        </div>
        <div>
          <span>Carbs</span>
          <span>{format(product.nutriments?.carbohydrates_100g)} g</span>
        </div>
        <div>
          <span>Fat</span>
          <span>{format(product.nutriments?.fat_100g)} g</span>
        </div>
        <div>
          <span>Sugar</span>
          <span>{format(product.nutriments?.sugars_100g)} g</span>
        </div>
        <div>
          <span>Fiber</span>
          <span>{format(product.nutriments?.fiber_100g)} g</span>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;