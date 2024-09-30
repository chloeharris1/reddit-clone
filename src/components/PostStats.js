import React from "react";

const PostStats = ({ post }) => {
  return (
    <div className="post-stats">
      <span className="post-score">{post.score}</span>
      <span className="post-comments">
        {post.num_comments} {post.num_comments === 1 ? "Comment" : "Comments"}
      </span>
      <span className="post-awards">{post.total_awards_received}</span>
    </div>
  );
};

export default PostStats;
