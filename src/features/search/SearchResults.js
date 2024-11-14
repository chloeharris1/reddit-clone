import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, Link } from "react-router-dom";
import {
  selectSearchResults,
  selectSearchStatus,
  fetchSearchResults,
} from "./searchSlice";
import PostPreview from "../../components/PostPreview";
import { LoadingSearch, NoResultsFound } from "../../components/UserMessage";
import { FingerprintSimple, ArrowLeft } from "@phosphor-icons/react";

export const SearchResults = () => {
  let [searchParams] = useSearchParams();
  let term = searchParams.get("q");
  const dispatch = useDispatch();

  const results = useSelector(selectSearchResults);
  const status = useSelector(selectSearchStatus);

  useEffect(() => {
    dispatch(fetchSearchResults(term));
  }, [term, dispatch]);

  if (status === "loading") {
    return <LoadingSearch />;
  }
  if (results.length === 0 && status === "succeeded") {
    return <NoResultsFound />;
  }

  return (
    <div className="search-results">
      <div className="search-results-header">
        <Link to={`/`} className="back-btn" alt="Back to posts list">
          <ArrowLeft size={24} className="arrow" />
        </Link>
        <h2>Search results for: {term}</h2>
      </div>
      {results.map((post) => (
        <div className="search-result" key={post.id}>
          <div className="result-subreddit">
            <FingerprintSimple size={28} color="#e0e0e0" />
            <p>{post.subreddit_name_prefixed}</p>
          </div>
          <PostPreview key={post.id} post={post} />
        </div>
      ))}
    </div>
  );
};
