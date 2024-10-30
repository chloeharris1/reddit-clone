import BounceLoader from "react-spinners/BounceLoader";

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
      <p className="loading-message">
        Your search has gone cold. No results found.
      </p>
      <img
        src={`${process.env.PUBLIC_URL}/searching.png`}
        alt="detective searching"
      ></img>
    </div>
  );
};
