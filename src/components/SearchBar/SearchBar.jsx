import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for movies..."
      />
    </div>
  );
}

export default SearchBar;