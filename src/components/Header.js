import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTerm, setTerm, clearTerm } from "../features/search/searchSlice";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { RedditLogo, List, X } from "@phosphor-icons/react";

export const Header = ({ toggleMenu, isMenuOpen }) => {
  const dispatch = useDispatch();
  const term = useSelector(selectTerm);

  const navigate = useNavigate(); // To navigate to the search results page

  const handleTermChange = (event) => {
    const newTerm = event.target.value;
    dispatch(setTerm(newTerm)); // Update term in Redux store
  };

  // Handle search form submission
  const handleSearch = (event) => {
    event.preventDefault(); // Prevent form submission
    // Navigate to the search page with the search term as a query parameter
    if (term.trim()) {
      navigate(`/search?q=${term}`);

      // Clear the search term after navigation
      dispatch(clearTerm());
    }
  };

  return (
    <header className="app-header" id="header">
      <div className="subreddit-menu" onClick={toggleMenu}>
        {isMenuOpen ? (
          <X size={32} color="#fafafa" />
        ) : (
          <List size={32} color="#fafafa" />
        )}
      </div>
      <span className="reddit-logo" alt="reddit-logo">
        <RedditLogo size={32} color="#fafafa" />
      </span>
      <h1>True Crime Feed</h1>
      <form className="search-bar" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <MagnifyingGlass size={24} className="search-icon" />
          <input
            type="text"
            value={term}
            onChange={handleTermChange}
            placeholder="Search posts"
          />
        </div>
      </form>
    </header>
  );
};
