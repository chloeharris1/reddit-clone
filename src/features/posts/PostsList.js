import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, fetchPosts } from "./postsSlice";
import PostPreview from "../../components/PostPreview";
import { isCommunityHighlight } from "../../utils/utils";
import { useParams } from "react-router-dom";
// import { SearchResults } from "../search/SearchResults";
import { selectCurrentSubreddit } from "../subreddits/subredditsSlice";

export const PostsList = () => {
  const { subreddit } = useParams(); // Get subreddit from URL
  const dispatch = useDispatch();

  // Get posts and subreddit data from Redux state
  const posts = useSelector(selectPosts);
  const currentSubreddit = useSelector(selectCurrentSubreddit);

  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    const subredditToFetch =
      subreddit || currentSubreddit || "dan_markel_murder";
    // Set the current subreddit and fetch posts based on the URL
    // dispatch(setCurrentSubreddit(subredditToFetch));
    dispatch(fetchPosts(subredditToFetch));
    console.log("Subreddit to fetch: ", subredditToFetch);
  }, [subreddit, currentSubreddit, dispatch]);

  // Refactored code - not using
  // useEffect(() => {
  //   const subredditToFetch = subreddit || "dan_markel_murder";
  //   // Sync Redux state with the URL if the selected subreddit doesn't match
  //   if (currentSubreddit !== subredditToFetch) {
  //     dispatch(setCurrentSubreddit(subredditToFetch));
  //     console.log(subredditToFetch);
  //     dispatch(fetchPosts(subredditToFetch));
  //   }
  // }, [subreddit, currentSubreddit, dispatch]);

  // Original code - not using
  // fetch posts whenever the subreddit changes
  // useEffect(() => {
  //   if (selectedSubreddit) {
  //     console.log("Selected subreddit:", selectedSubreddit);
  //     dispatch(fetchPosts(selectedSubreddit));
  //   }
  // }, [selectedSubreddit, dispatch]);

  if (status === "loading") {
    return <p>Loading posts...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  // Filter out community highlight posts
  const userPosts = posts.filter((post) => !isCommunityHighlight(post));

  return (
    <div className="posts-list">
      <h2>r/{subreddit || currentSubreddit}</h2>
      <ul>
        {userPosts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          userPosts.map((post) => (
            <li key={post.id}>
              <PostPreview key={post.id} post={post} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PostsList;
