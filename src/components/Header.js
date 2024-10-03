import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { fetchSearchResults } from "../features/search/searchSlice";
// import { selectSelectedSubreddit } from "../features/posts/postsSlice";
import { selectSubreddits } from "../features/subreddits/subredditsSlice";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // Get full list of subreddits
  const allSubreddits = useSelector(selectSubreddits);
  console.log("All subreddits:", allSubreddits);

  // Get defined subreddits from state
  // const selectedSubreddits = useSelector(selectSelectedSubreddit);
  // console.log(selectedSubreddits);

  const handleSearch = (e) => {
    e.preventDefault();

    // Use full list of subreddits for search
    let subredditsToSearch = allSubreddits.map((sub) => sub.name);

    // Update the URL to reflect the search query, include subreddits in search
    if (searchTerm.trim()) {
      navigate(
        `/search?q=${searchTerm}&subreddits=${subredditsToSearch.join(",")}`
      );
      console.log("Search Term is:", searchTerm);
      // console.log("Subreddits:", subredditsToSearch);
    }

    // Dispatch search with search term and selected subreddits
    // dispatch(
    //   fetchSearchResults({ searchTerm, subreddits: selectedSubreddits })
    // );
  };

  return (
    <header className="app-header">
      <h1>True Crime Feed</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};
