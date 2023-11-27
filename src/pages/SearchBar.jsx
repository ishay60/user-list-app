import React from "react";

const SearchBar = ({ handleSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search users..."
      onChange={(event) => handleSearch(event.target.value)}
    />
  );
};

export default SearchBar;
