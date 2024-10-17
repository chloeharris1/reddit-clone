import React from "react";

import { renderPostContent } from "../utils/utils";
import CommentsList from "./comments/CommentsList";
import ReactMarkdown from "react-markdown";

const FullPost = ({ post }) => {
  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="full-post">
      <h1>
        <ReactMarkdown>{post.title}</ReactMarkdown>
      </h1>
      {renderPostContent(post)}
      <CommentsList subreddit={post.subreddit} postId={post.id} />
    </div>
  );
};

export default FullPost;
