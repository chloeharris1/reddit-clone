import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  selectSearchResults,
  selectSearchStatus,
  fetchSearchResults,
} from "./searchSlice";
// import { selectSubreddits } from "../subreddits/subredditsSlice";
import PostPreview from "../../components/PostPreview";
// import PostsList from "../posts/PostsList";

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const dispatch = useDispatch();

  const results = useSelector(selectSearchResults);
  // console.log("Search results:", results);
  const status = useSelector(selectSearchStatus);

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchSearchResults(searchTerm)); // Trigger search
    }
  }, [searchTerm, dispatch]);
  if (status === "loading") {
    return <p>Loading search results...</p>;
  }
  if (results.length === 0 && status === "succeeded") {
    return <p>No results found for "{searchTerm}".</p>;
  }

  return (
    <div className="search-results">
      <h2>Search results for: {searchTerm}</h2>

      {results.map((post) => (
        <div className="search-result">
          <h2>{post.subreddit_name_prefixed}</h2>
          <PostPreview key={post.id} post={post} />
        </div>
      ))}
    </div>
  );
};
