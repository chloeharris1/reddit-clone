import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPosts,
  selectCommentsByPostId,
  fetchComments,
  selectCurrentPostId,
} from "../features/posts/postsSlice";
import { renderPostContent } from "../utils/utils";
import CommentsList from "./comments/CommentsList";
import ReactMarkdown from "react-markdown";

const FullPost = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectPosts);
  const post = posts.find((p) => p.id === currentPostId);
  const currentPostId = useSelector(selectCurrentPostId);
  const comments = useSelector((state) =>
    selectCommentsByPostId(state, currentPostId)
  );
  console.log(post);

  useEffect(() => {
    if (currentPostId && post) {
      const subreddit = post.subreddit; // Extract subreddit from the post
      dispatch(fetchComments({ subreddit, postId: currentPostId })); // Fetch comments based on the postId
    }
  }, [dispatch, currentPostId, post]);

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="full-post">
      <h1>
        <ReactMarkdown>{post.title}</ReactMarkdown>
      </h1>
      {renderPostContent(post)}
      <CommentsList comments={comments} />
      {/* <CommentsList subreddit={post.subreddit} postId={currentPostId} /> */}
    </div>
  );
};

export default FullPost;
