// Individual Comment
import React from "react";
import moment from "moment";
import "./Comment.css";
import ReactMarkdown from "react-markdown";
import CommentStats from "./CommentStats";

const Comment = ({ comment }) => {
  const { author, body, replies, created_utc } = comment;

  const nestedReplies = replies?.data?.children || [];

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="user-avatar">
          <img src={`${process.env.PUBLIC_URL}/avatar.png`} alt="user-avatar" />
        </span>
        <div className="author-info">
          <p className="author-name">{author}</p>
          <span class="dot-separator">•</span>
          <p className="comment-time">{moment.unix(created_utc).fromNow()}</p>
        </div>
      </div>
      <div className="comment-body">
        <ReactMarkdown>{body}</ReactMarkdown>
        <CommentStats comment={comment} />
        {nestedReplies.length > 0 && (
          <div className="comment-replies">
            {nestedReplies.map(
              (reply) =>
                // Check if reply.kind is "t1" to ensure it's a valid comment
                reply.kind === "t1" && (
                  <Comment key={reply.data.id} comment={reply.data} />
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
