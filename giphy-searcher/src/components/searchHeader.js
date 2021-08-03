import React from 'react';
import logo from '../giphy-searcher-logo.svg';

function SearchHeader({ lastSearch }) {
  return (
    <header>
      <div className="brand">
        <img src={logo} alt="" />
        <h1>Giphy Searcher</h1>
      </div>
    </header>
  );
}
export default SearchHeader;