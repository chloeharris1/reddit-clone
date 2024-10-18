import React from "react";
import { Link } from "react-router-dom";
import { renderPostContent, renderPostCredits } from "../utils/utils";
import PostStats from "./PostStats";
import ReactMarkdown from "react-markdown";

const PostPreview = ({ post }) => {
  if (!post) {
    return null;
  }
  return (
    <Link to={`/r/${post.subreddit}/comments/${post.id}`}>
      <div className="post-preview" alt={post.title}>
        {renderPostCredits(post)}
        <h2>
          <ReactMarkdown>{post.title}</ReactMarkdown>
        </h2>
        <div className="post-flair">
          <ReactMarkdown>{post.link_flair_text}</ReactMarkdown>
        </div>

        {renderPostContent(post)}
        <PostStats post={post} />
        <hr></hr>
      </div>
    </Link>
  );
};

export default PostPreview;
