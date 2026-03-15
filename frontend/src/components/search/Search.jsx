import React from "react";
import { CiSearch } from "react-icons/ci";
import "./Search.css";

function Search({ search, setSearch }) {
  return (
    <div className="search-space">
      <div className="space">
        <p className="search-text">
          <CiSearch />
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </p>
      </div>
    </div>
  );
}

export default Search;