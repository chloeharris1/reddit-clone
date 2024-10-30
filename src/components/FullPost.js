import React from "react";
import { renderPostContent, renderPostCredits } from "../utils/utils";
import CommentsList from "./comments/CommentsList";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

const FullPost = ({ post }) => {
  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="full-post">
      <div className="full-post-header">
        <Link
          to={`/r/${post.subreddit}`}
          className="back-btn"
          alt="Back to posts list"
        >
          <ArrowLeft size={24} className="arrow" />
        </Link>
        {renderPostCredits(post)}
      </div>
      <h1>
        <ReactMarkdown>{post.title}</ReactMarkdown>
      </h1>
      <div className="post-content">{renderPostContent(post)}</div>
      <CommentsList subreddit={post.subreddit} postId={post.id} />
    </div>
  );
};

export default FullPost;
