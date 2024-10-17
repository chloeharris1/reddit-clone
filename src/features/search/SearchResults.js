import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  selectSearchResults,
  selectSearchStatus,
  fetchSearchResults,
} from "./searchSlice";
import PostPreview from "../../components/PostPreview";

export const SearchResults = () => {
  let [searchParams] = useSearchParams();
  let term = searchParams.get("q");
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const results = useSelector(selectSearchResults);
  const status = useSelector(selectSearchStatus);

  useEffect(() => {
    dispatch(fetchSearchResults(term));
  }, [term, dispatch]);

  if (status === "loading") {
    return <p>Loading search results...</p>;
  }
  if (results.length === 0 && status === "succeeded") {
    return <p>No results found for "{term}".</p>;
  }

  return (
    <div className="search-results">
      <h2>Search results for: {term}</h2>

      {results.map((post) => (
        <div className="search-result" key={post.id}>
          <h2>{post.subreddit_name_prefixed}</h2>
          <PostPreview key={post.id} post={post} />
        </div>
      ))}
    </div>
  );
};
