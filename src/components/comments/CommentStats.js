import React from "react";
import { ArrowFatUp, ArrowFatDown } from "@phosphor-icons/react";

const CommentStats = ({ comment }) => {
  return (
    <div className="comment-stats">
      <span className="comment-score">
        <ArrowFatUp size={16} color="#E0E0E0" />
        {comment.score}
        <ArrowFatDown size={16} color="#E0E0E0" />
      </span>
    </div>
  );
};

export default CommentStats;
