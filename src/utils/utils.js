import React from "react";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import { UserCircle } from "@phosphor-icons/react";

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
  "GilgoBeachMurders",
];

/* Helper functions */

// Get today's date and format it
export const currentDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const isCommunityHighlight = (post) => {
  return post.stickied;
};

export const isVideoPost = (post) => {
  return (
    post.post_hint === "rich:video" || // Check for rich media video posts
    post.media_embed || // Check if there is embedded media content (had .content on the end but it caused an error)
    post.domain === "youtu.be" ||
    post.domain === "youtube.com" // Check for YouTube domains
  );
};

export const isImagePost = (post) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  return (
    imageExtensions.some((ext) => post.url.includes(ext)) ||
    post.domain === "i.redd.it" ||
    post.domain === "preview.redd.it"

    // post.post_hint === "image" ||
    // (post.url && (post.url.endsWith(".jpg") || post.url.endsWith(".png")))
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
    // console.log("Video post detected");
    // Check if the post has a media embed with an iframe URL
    if (post.media_embed && post.media_embed.content) {
      const match = post.media_embed.content.match(/src="([^"]*)"/); // Find src attribute within HTML markup
      if (match) {
        const videoUrl = match[1];
        return (
          <div className="media-container">
            <iframe
              src={videoUrl}
              title={post.title}
              width="100%"
              height="400px"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      }
    }

    // Fallback for video domains like YouTube
    if (post.domain === "youtu.be" || post.domain === "youtube.com") {
      const videoId = post.url.split("/").pop();
      return (
        <div className="media-container">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            width="560"
            // frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={post.title}
          />
        </div>
      );
    }
  }

  if (isImagePost(post)) {
    // console.log("Image post detected");
    return (
      <div className="media-container">
        <img
          src={post.url}
          alt={post.title}
          style={{
            // maxWidth: "100%",
            // height: "auto",
            // maxHeight: "100%",
            objectFit: "contain",
            // objectPosition: "top",
          }}
        />
      </div>
    );
  }
  // console.log(post.url);

  if (isLinkPost(post)) {
    // console.log("Link post detected");
    return (
      <a
        href={post.url}
        className="post-url"
        target="_blank"
        rel="noopener noreferrer"
      >
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

export const renderPostCredits = (post) => {
  return (
    <div className="post-credits">
      <span className="user-avatar">
        <UserCircle size={24} alt="user-avatar" color="#fafafa" />
      </span>
      <span>{post.author}</span>
      <span class="dot-separator">•</span>
      <span>{moment.unix(post.created_utc).fromNow()}</span>
      <a
        href={`https://www.reddit.com${post.permalink}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on Reddit
      </a>
    </div>
  );
};
