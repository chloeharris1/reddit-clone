import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, fetchPosts, selectSelectedSubreddit } from "./postsSlice";
import PostPreview from "../../components/PostPreview";
import { isCommunityHighlight } from "../../utils/utils";
import { useParams } from "react-router-dom";
// import { SearchResults } from "../search/SearchResults";

export const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);

  // fetch posts whenever the subreddit changes
  useEffect(() => {
    if (selectedSubreddit) {
      // console.log("Selected subreddit:", selectedSubreddit);
      dispatch(fetchPosts(selectedSubreddit));
    }
  }, [selectedSubreddit, dispatch]);

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
      <h2>r/{selectedSubreddit}</h2>
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
