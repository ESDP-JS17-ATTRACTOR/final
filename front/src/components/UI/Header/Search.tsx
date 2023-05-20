import React from 'react';

const Search = () => {
  return (
    <form className="search">
      <input className="search_input" type="text" placeholder="Search" />
      <button className="search_button" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
