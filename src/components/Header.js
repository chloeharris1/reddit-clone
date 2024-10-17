import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { selectTerm, setTerm, clearTerm } from "../features/search/searchSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const term = useSelector(selectTerm);
  // const [searchTerm, setSearchTerm] = useState("");
  // returns the location object from the current URL
  // let location = useLocation();
  // const navigate = useNavigate();

  // let handleTermChange = (e) => dispatch(setTerm(e.target.value));

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   navigate(`/search?q=${term}`);
  // };

  // useEffect(() => {
  //   if (location.pathname !== "/search") {
  //     dispatch(clearTerm());
  //   }
  // }, [location, dispatch]);
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
