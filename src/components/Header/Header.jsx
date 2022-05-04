import "./Header.scss";
import logo from "../../assets/logos/InStock-Logo_1x.png";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav__logo">
          <img src={logo} alt="company logo" />
        </Link>
        <div className="nav__list">
          <NavLink
            to="/warehouses"
            className="nav__link"
            activeClassName="nav__link--highlight"
          >
            Warehouses
          </NavLink>

          <NavLink
            to="/inventory"
            className="nav__link"
            activeClassName="nav__link--highlight"
          >
            Inventory
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
