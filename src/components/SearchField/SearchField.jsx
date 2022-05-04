import searchIcon from "../../assets/icons/search-24px.svg";
import "./SearchField.scss";

function SearchField() {
  return (
    <div className="search search__wh">
      <div className="search__text">
        <input
          className="search__input"
          type="text"
          placeholder="Search..."
          autoFocus
        />
        <img className="search__img" src={searchIcon} alt="search icon" />
      </div>
    </div>
  );
}

export default SearchField;
