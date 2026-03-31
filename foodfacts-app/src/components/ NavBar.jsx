import { NavLink } from "react-router-dom";

function NavBar({ savedCount }) {
  return (
    <div className="nav-links">
  <NavLink to="/">Search</NavLink>
  <NavLink to="/saved">
    Saved {savedCount > 0 && <span className="badge">{savedCount}</span>}
  </NavLink>
</div>)
}

export default NavBar;