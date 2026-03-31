import { useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/ NavBar";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import SavedPage from "./pages/SavedPage";

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      if (state.find((p) => p.code === action.product.code)) return state;
      return [...state, action.product];

    case "REMOVE":
      return state.filter((p) => p.code !== action.code);

    default:
      return state;
  }
}

function App() {
  const [saved, dispatch] = useReducer(reducer, []);

  return (
    <div>
      <NavBar savedCount={saved.length} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/product/:barcode"
          element={<DetailPage saved={saved} dispatch={dispatch} />}
        />
        <Route
          path="/saved"
          element={<SavedPage saved={saved} dispatch={dispatch} />}
        />
      </Routes>
    </div>
  );
}

export default App;