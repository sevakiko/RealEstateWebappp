import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Search.css';

function Search() {

  let pageNumber = 0

  const navigate = useNavigate();

  const getQuery = () => {
    return document.getElementById("query").value
  };

  const handleSearch = async (e) => {
    navigate(`/results/${getQuery()}/${pageNumber}/`)
  }

  return (
    <div className="search-container">
      <form onSubmit={(e) => handleSearch(e)}>
        <input type="text" placeholder="Search" id="query" required className="search-input" />
        <button type="submit" className='btn-dark search-btn'> Search</button>
      </form>
    </div>
  );
}

export default Search;