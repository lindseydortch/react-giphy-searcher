import React from 'react'
import { SearchIcon } from '../shared/AppIcon';

function SearchForm({ handleSubmit, handleChange, searchString }) {
  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      <input
        placeholder="Search"
        type="text"
        name="searchString"
        required
        onChange={handleChange}
        value={searchString}
      />
      <button type="submit">
        <SearchIcon height="2rem" width="2rem" />
      </button>
    </form>
  );
}

export default SearchForm
