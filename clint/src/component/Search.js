import React from "react";
import SearchIcon from "@material-ui/icons/Search";
function Search() {
  return (
    <div className="search-box">
      <form>
        <div className="search-div">
          <SearchIcon className="search-icon" fontSize="large" />
          <input
            className="search-input"
            type="text"
            name="search-querry"
            placeholder="Search Questions"
          />
        </div>
      </form>
    </div>
  );
}

export default Search;
