import React from "react";
import {
  ChatTeardrop,
  ArrowFatUp,
  ArrowFatDown,
  Medal,
} from "@phosphor-icons/react";

const PostStats = ({ post }) => {
  return (
    <div className="post-stats">
      <span className="post-score">
        <ArrowFatUp size={16} color="#E0E0E0" />
        {post.score}
        <ArrowFatDown size={16} color="#E0E0E0" />
      </span>
      <span className="post-comments">
        <ChatTeardrop size={16} color="#ff6666" />
        {post.num_comments} {post.num_comments === 1 ? "Comment" : "Comments"}
      </span>
      <span className="post-awards">
        <Medal size={16} color="#E0E0E0" />
        {post.total_awards_received}
      </span>
    </div>
  );
};

export default PostStats;
