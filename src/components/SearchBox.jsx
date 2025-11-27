import React from 'react';

function SearchBox({ searchTerm, onSearchChange }) {
  return (
    <section className="search-box">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Поиск задач..."
      />
    </section>
  );
}

export default SearchBox;