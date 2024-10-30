import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  selectSearchResults,
  selectSearchStatus,
  fetchSearchResults,
} from "./searchSlice";
import PostPreview from "../../components/PostPreview";
import { LoadingSearch, NoResultsFound } from "../../components/UserMessage";
import { FingerprintSimple } from "@phosphor-icons/react";

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
    return <LoadingSearch />;
  }
  if (results.length === 0 && status === "succeeded") {
    return <NoResultsFound />;
    // return <p>No results found for "{term}".</p>;
  }

  return (
    <div className="search-results">
      <hr></hr>
      <h2>Search results for: {term}</h2>
      <hr></hr>
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
