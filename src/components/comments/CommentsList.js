// List of comments in Full Post
import React, { memo, useEffect } from "react";
import Comment from "./Comment";
import {
  selectCommentsByPostId,
  fetchComments,
} from "../../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";

const CommentsList = ({ subreddit, postId }) => {
  const dispatch = useDispatch();

  const comments = useSelector((state) =>
    selectCommentsByPostId(state, postId)
  );

  // Dispatch fetchComments on mount or when postId changes
  useEffect(() => {
    if (!comments.length) {
      dispatch(fetchComments({ subreddit, postId }));
    }
  }, [dispatch, subreddit, postId, comments.length]);
  console.log(comments);

  if (comments.length === 0) {
    return <p>No comments yet</p>;
  }

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default memo(CommentsList);
