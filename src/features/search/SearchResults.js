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

export const SearchResults = () => {
  const dispatch = useDispatch();
  const results = useSelector(selectSearchResults);
  const status = useSelector(selectSearchStatus);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // Get search term from URL

  useEffect(() => {
    const subreddits = searchParams.get("subreddits")?.split(",") || []; // Get subreddits from URL
    console.log("Subreddits: ", subreddits, "Search Query: ", query);

    if (query && subreddits.length > 0) {
      // Dispatch search results fetch action based on query
      dispatch(fetchSearchResults({ searchTerm: query, subreddits }));
    }
  }, [query, searchParams, dispatch]);

  if (status === "loading") {
    return <p>Loading search results...</p>;
  }

  if (results.length === 0 && status === "succeeded") {
    return <p>No results found for "{query}".</p>;
  }

  return (
    <div className="search-results">
      {results.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </div>
  );
};
