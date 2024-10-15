import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  selectSearchResults,
  selectSearchStatus,
  fetchSearchResults,
} from "./searchSlice";
// import { selectSubreddits } from "../subreddits/subredditsSlice";
import PostPreview from "../../components/PostPreview";
// import PostsList from "../posts/PostsList";
import { fetchPostById, setCurrentPostId } from "../posts/postsSlice";

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const results = useSelector(selectSearchResults);
  const status = useSelector(selectSearchStatus);

  useEffect(() => {
    dispatch(fetchSearchResults(searchTerm));
    // if (searchTerm) {
    //   dispatch(fetchSearchResults(searchTerm)); // Trigger search
    // }
  }, [searchTerm, dispatch]);

  // Fetch individual post when search result is clicked - top click handler from 10/11
  // const handlePostClick = (post) => {
  //   console.log("Navigating to post ID:", post.id);
  //   navigate(`/comments/${post.id}`, { state: { post } });
  // };
  // const handlePostClick = (postId) => {
  //   console.log("Navigating to post ID:", postId);
  //   dispatch(setCurrentPostId(postId));
  //   dispatch(fetchPostById(postId));
  //   navigate(`/search/${postId}`);
  // };

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
        <div
          className="search-result"
          key={post.id}
          // onClick={() => handlePostClick(post.id)}
        >
          <h2>{post.subreddit_name_prefixed}</h2>
          <PostPreview key={post.id} post={post} />
        </div>
      ))}
    </div>
  );
};
