// Individual Comment
import React from "react";
import moment from "moment";
import "./Comment.css";

const Comment = ({ comment }) => {
  const { author, body, replies, created_utc, icon } = comment;

  return (
    <div className="comment">
      <div className="comment-header">
        <img src={icon} alt={`${author}'s icon`} className="author-icon" />
        <div className="author-info">
          <p className="author-name">{author}</p>
          <p className="comment-time">{moment.unix(created_utc).fromNow()}</p>
        </div>
      </div>
      <div className="comment-body">
        <p>{body}</p>
      </div>
      {replies && replies.length > 0 && (
        <div className="comment-replies">
          {replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
