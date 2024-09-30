import React, { useEffect } from "react";
import SubredditsList from "./features/subreddits/SubredditsList";
import PostsList from "./features/posts/PostsList";
import { useParams } from "react-router-dom";
import { Header } from "./components/Header";
import FullPost from "./components/FullPost";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedSubreddit,
  setCurrentPostId,
  selectSelectedSubreddit,
  selectCurrentPostId,
} from "./features/posts/postsSlice";

const RedditApp = () => {
  const dispatch = useDispatch();
  // // Get the selected subreddit from the URL params
  const { subredditName, postId } = useParams();

  // Get selected subreddit and post ID from Redux
  const selectedSubreddit = useSelector(selectSelectedSubreddit);
  const currentPostId = useSelector(selectCurrentPostId);

  // Update subreddit and postId when URL params change
  useEffect(() => {
    if (subredditName && subredditName !== selectedSubreddit) {
      dispatch(setSelectedSubreddit(subredditName));
    }
    if (postId && postId !== currentPostId) {
      dispatch(setCurrentPostId(postId));
    } else if (!postId) {
      dispatch(setCurrentPostId(null)); // Clear post ID if none in URL
    }
  }, [subredditName, postId, dispatch, selectedSubreddit, currentPostId]);

  return (
    <div className="app-container">
      <Header />
      <aside className="sidebar">
        <SubredditsList />
      </aside>
      <main className="main-content">
        {currentPostId ? (
          <FullPost postId={currentPostId} />
        ) : (
          <PostsList selectedSubreddit={selectedSubreddit} />
        )}
      </main>
    </div>
  );
};

export default RedditApp;
