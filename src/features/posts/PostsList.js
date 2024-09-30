import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, fetchPosts, selectSelectedSubreddit } from "./postsSlice";
import PostPreview from "../../components/PostPreview";
import { isCommunityHighlight } from "../../utils/utils";

export const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  // console.log(posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);

  // fetch posts whenever the subreddit changes
  useEffect(() => {
    if (selectedSubreddit) {
      console.log("Selected subreddit:", selectedSubreddit);
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
  const filteredPosts = posts.filter((post) => !isCommunityHighlight(post));

  return (
    <div className="posts-list">
      <h2>r/{selectedSubreddit}</h2>
      <ul>
        {filteredPosts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          filteredPosts.map((post) => (
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
