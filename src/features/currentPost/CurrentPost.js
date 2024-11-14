import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById, clearCurrentPost } from "./currentPostSlice";
import { useParams } from "react-router-dom";
import FullPost from "../../components/FullPost";
import { LoadingMsg } from "../../components/UserMessage";

const CurrentPost = () => {
  const dispatch = useDispatch();
  const { subreddit, postId } = useParams();
  const post = useSelector((state) => state.currentPost.post);
  const loading = useSelector((state) => state.currentPost.loading);
  const error = useSelector((state) => state.currentPost.error);

  useEffect(() => {
    dispatch(fetchPostById({ subreddit, postId }));

    return () => {
      // Clear the selected post state when the component unmounts or route changes
      dispatch(clearCurrentPost());
    };
  }, [dispatch, subreddit, postId]);

  if (loading) {
    return <LoadingMsg />;
  }

  if (error) {
    return <p>Error loading post: {error}</p>;
  }

  if (!post) {
    return null;
  }

  return <FullPost post={post} />;
};

export default CurrentPost;
