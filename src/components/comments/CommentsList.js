// List of comments in Full Post
import React, { memo, useEffect } from "react";
import Comment from "./Comment";
import {
  fetchComments,
  selectCommentsByPostId,
} from "../../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";

const CommentsList = ({ subreddit, postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) =>
    selectCommentsByPostId(state, postId)
  );

  useEffect(() => {
    // fetch comments when component mounts
    dispatch(fetchComments({ subreddit, postId }));
  }, [dispatch, subreddit, postId]);

  if (!comments || comments.length === 0) {
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
