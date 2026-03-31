import FoodCard from "./FoodCard";

function FoodList({ products }) {
  if (products.length === 0) return <p>No results</p>;

  return (
    <div className="food-list">
      {products.map((p) => (
        <FoodCard key={p.code} product={p} />
      ))}
    </div>
  );
}

export default FoodList;