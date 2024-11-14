import BounceLoader from "react-spinners/BounceLoader";
import { Detective } from "@phosphor-icons/react";

// Loading posts list
export const LoadingMsg = () => {
  return (
    <div className="page-status">
      <p className="loading-message">Loading posts</p>
      <BounceLoader size={60} color="#fafafa" />
    </div>
  );
};

// Loading search results
export const LoadingSearch = () => {
  return (
    <div className="page-status">
      <p className="loading-message">Loading search results</p>
      <BounceLoader size={60} color="#fafafa" />
    </div>
  );
};

// No search results for term
export const NoResultsFound = () => {
  return (
    <div className="page-status">
      <span className="loading-message">
        <h3>Your search has gone cold.</h3>
        <p>
          Double-check your spelling or try different keywords to adjust your
          search
        </p>
      </span>
      <Detective size={80} color="#fafafa" />
    </div>
  );
};
