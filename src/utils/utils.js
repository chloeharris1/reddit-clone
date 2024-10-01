import React from "react";
import ReactMarkdown from "react-markdown";
import moment from "moment";

// Base URL
export const baseUrl = "https://www.reddit.com";

// True crime subreddits
export const crimeSubreddits = [
  "TrueCrime",
  "crime",
  "RedditCrimeCommunity",
  "TrueCrimeDiscussion",
  "UnresolvedMysteries",
  "UnsolvedMysteries",
  "serialkillers",
  "CourtTVCases",
  "dan_markel_murder",
  "coldcases",
  "TrueCrimePodcasts",
  "TrueCrimeBooks",
  "ForensicFiles",
  "courtneyclenneytrial",
  "jaredbridegan",
  "KouriRichins",
  "CasesWeFollow",
];

export const subredditImg = "noun-fingerprint.png";

// export const userImg = "noun-detective-5490050.png";

/* Helper functions */

export const isCommunityHighlight = (post) => {
  return post.stickied;
};

export const isVideoPost = (post) => {
  return (
    post.post_hint === "rich:video" || // Check for rich media video posts
    post.media_embed.content || // Check if there is embedded media content
    post.domain === "youtu.be" ||
    post.domain === "youtube.com" // Check for YouTube domains
  );
};

export const isImagePost = (post) => {
  return (
    post.post_hint === "image" ||
    post.url.endsWith(".jpg") ||
    post.url.endsWith(".png")
  );
};

export const isTextPost = (post) => {
  return post.selftext && post.selftext_html;
};

export const isLinkPost = (post) => {
  return post.url && !post.is_video && !post.is_self;
};

// Conditional rendering based on post type
export const renderPostContent = (post) => {
  if (isVideoPost(post)) {
    console.log("Video post detected");
    // Check if the post has a media embed with an iframe URL
    if (post.media_embed && post.media_embed.content) {
      const match = post.media_embed.content.match(/src="([^"]*)"/); // Find src attribute within HTML markup
      if (match) {
        const videoUrl = match[1];
        return (
          <iframe
            src={videoUrl}
            title={post.title}
            width="100%"
            height="400px"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      }
    }

    // Fallback for video domains like YouTube
    if (post.domain === "youtu.be" || post.domain === "youtube.com") {
      const videoId = post.url.split("/").pop();
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          width="560"
          height="315"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={post.title}
        />
      );
    }
  }

  if (isImagePost(post)) {
    // console.log("Image post detected");
    return <img src={post.url} alt={post.title} />;
  }

  if (isLinkPost(post)) {
    // console.log("Link post detected");
    return (
      <a href={post.url} target="_blank" rel="noopener noreferrer">
        {post.url}
      </a>
    );
  }

  if (isTextPost(post)) {
    // console.log("Text post detected");
    return (
      <div className="markdown-content">
        <ReactMarkdown>{post.selftext}</ReactMarkdown>
      </div>
    );
  }

  // Default fallback for other types of content
  return <p>{post.selftext || "No content available"}</p>;
};

// New functions 9/05
export const renderPostCredits = (post) => {
  return (
    <div className="post-credits">
      {/* <img src={userImg} className="user-icon" alt="user-icon" /> */}
      <span>posted by {post.author}</span>
      <span>{moment.unix(post.created_utc).fromNow()}</span>
    </div>
  );
};
