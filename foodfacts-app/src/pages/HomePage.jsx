import useFoodSearch from "../hooks/ useFoodSearch";
import SearchBar from "../components/SearchBar";
import FoodList from "../components/FoodList";
import ErrorMessage from "../components/ErrorMessage";

function HomePage() {
  const { results, loading, error, searchFood } = useFoodSearch();

  return (
    <div>
      <h2>Search</h2>

      <SearchBar onSearch={searchFood} />

      {loading && <p>Loading...</p>}
      {error && <ErrorMessage message={error} />}

      <FoodList products={results} />
    </div>
  );
}

export default HomePage;