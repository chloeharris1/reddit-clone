import React, { useEffect } from "react";
import SubredditsList from "./features/subreddits/SubredditsList";
import PostsList from "./features/posts/PostsList";
import { useParams, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import FullPost from "./components/FullPost";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedSubreddit,
  setCurrentPostId,
  selectSelectedSubreddit,
  selectCurrentPostId,
  selectCommentsByPostId,
  selectPostsStatus,
  fetchPostById,
  fetchPosts,
} from "./features/posts/postsSlice";
import { SearchResults } from "./features/search/SearchResults";

const RedditApp = () => {
  const dispatch = useDispatch();
  // // Get URL params for subreddit and postId
  const { subreddit, postId } = useParams();

  // Detect search route using location
  const location = useLocation();
  const isSearch = location.pathname.startsWith("/search");

  // Retrieve current subreddit and postId from Redux store
  const selectedSubreddit = useSelector(selectSelectedSubreddit);
  const postsStatus = useSelector(selectPostsStatus);
  const currentPostId = useSelector(selectCurrentPostId);

  const post = useSelector((state) =>
    selectCommentsByPostId(state, currentPostId)
  );

  // Update subreddit and postId when URL params change
  useEffect(() => {
    // Check if it's a search route or a subreddit route
    // if (isSearch) {
    //   // Handle search route logic
    //   if (postId && !currentPostId) {
    //     dispatch(setCurrentPostId(postId)); // Set current post ID for the search case
    //     dispatch(fetchPostById(postId)); // Fetch the post by ID (search result)
    //   }
    // } else {
    //   // Handle subreddit route logic
    //   if (subredditName && subredditName !== selectedSubreddit) {
    //     dispatch(setSelectedSubreddit(subredditName));
    //   }
    //   if (subredditName && postsStatus === "idle") {
    //     dispatch(fetchPosts(subredditName)); // Fetch posts for the subreddit
    //   }
    // }
    if (isSearch && postId) {
      // If it's a search route, just set the current post ID
      // dispatch(setCurrentPostId(postId));
      dispatch(fetchPostById(postId));
    } else if (subreddit) {
      // If it's a normal subreddit route, set the subreddit and post
      dispatch(setSelectedSubreddit(subreddit));
      if (postId) dispatch(setCurrentPostId(postId));
    }
    if (subreddit && subreddit !== selectedSubreddit) {
      dispatch(setSelectedSubreddit(subreddit));
    }
    if (postId && postId !== currentPostId) {
      console.log("Setting current post ID:", postId);
      dispatch(setCurrentPostId(postId));
    } else if (!postId) {
      dispatch(setCurrentPostId(null)); // Clear post ID if none in URL
    }
    // [subredditName, postId, dispatch, selectedSubreddit, currentPostId];
  }, [dispatch, subreddit, postId, isSearch, selectedSubreddit, currentPostId]);

  // 10/10 rec changes: [dispatch, subredditName, postId, isSearch]
  return (
    <div className="app-container">
      <Header />
      <aside className="sidebar">
        <SubredditsList />
      </aside>
      <main className="main-content">
        {isSearch ? (
          <SearchResults />
        ) : currentPostId ? (
          <FullPost />
        ) : (
          <PostsList selectedSubreddit={selectedSubreddit} />
        )}
      </main>
    </div>
  );
};

export default RedditApp;
