import "./SearchHeader.scss";
import MainButton from "../MainButton/MainButton";
import SearchField from "../SearchField/SearchField";

function SearchHeader(props) {
  return (
    <>
      <div className="search-header">
        <h1 className="search-header__title">{props.title}</h1>
        <div className={`search-header__wrapper search-header__wrapper--${props.link}`}>
          <SearchField />
          <MainButton to={`/${props.link}/add`}>
            <h3 className="search-header__content btn">{props.content}</h3>
          </MainButton>
        </div>
      </div>
    </>
  );
}

export default SearchHeader;
