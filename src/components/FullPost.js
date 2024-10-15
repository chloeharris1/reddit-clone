import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPosts,
  selectCommentsByPostId,
  fetchComments,
  selectCurrentPostId,
  setSelectedSubreddit,
  fetchPostById,
} from "../features/posts/postsSlice";
import { renderPostContent } from "../utils/utils";
import CommentsList from "./comments/CommentsList";
import ReactMarkdown from "react-markdown";
import { useParams, useLocation } from "react-router-dom";

const FullPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  // const location = useLocation();
  // const post = location.state?.post;

  const posts = useSelector(selectPosts);
  // const currentPostId = useSelector(selectCurrentPostId);

  // Use postId directly from useParams
  const post = posts.find((post) => post.id === postId);
  console.log(postId);

  // const post = posts.find((p) => p.id === currentPostId);

  // console.log(
  //   "Post IDs in posts array:",
  //   posts.map((post) => post.id)
  // ); // Logs all the post IDs

  // const comments = useSelector((state) =>
  //   selectCommentsByPostId(state, currentPostId)
  // );
  // console.log(comments);

  useEffect(() => {
    if (postId && post) {
      // dispatch(fetchPostById(postId)); // Fetch post if it's not already in the posts array
      const subreddit = post.subreddit; // Extract subreddit from the post
      dispatch(setSelectedSubreddit(subreddit));
      console.log(subreddit);
      dispatch(fetchComments({ subreddit, postId })); // Fetch comments based on the postId
    }
  }, [dispatch, postId, post]);

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="full-post">
      <h1>
        <ReactMarkdown>{post.title}</ReactMarkdown>
      </h1>
      {renderPostContent(post)}
      <CommentsList subreddit={post.subreddit} postId={postId} />
    </div>
  );
};

export default FullPost;
