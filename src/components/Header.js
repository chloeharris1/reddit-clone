import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTerm, setTerm, clearTerm } from "../features/search/searchSlice";
import { currentDate } from "../utils/utils";

export const Header = () => {
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
    <header className="app-header">
      <p className="date">{currentDate}</p>
      <h1>True Crime Feed</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={term}
          onChange={handleTermChange}
          placeholder="Search posts"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};
