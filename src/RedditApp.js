/* Original code */
// import React, { useEffect } from "react";
// import SubredditsList from "./features/subreddits/SubredditsList";
// import PostsList from "./features/posts/PostsList";
// import { useParams, useLocation } from "react-router-dom";
// import { Header } from "./components/Header";
// import FullPost from "./components/FullPost";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setSelectedSubreddit,
//   setCurrentPostId,
//   selectCurrentPostId,
//   selectCommentsByPostId,
//   selectPostsStatus,
//   fetchPostById,
//   fetchPosts,
// } from "./features/posts/postsSlice";
// import { selectCurrentSubreddit } from "./features/subreddits/subredditsSlice";
// import { SearchResults } from "./features/search/SearchResults";

// const RedditApp = () => {
//   const dispatch = useDispatch();
//   const { subreddit } = useParams();

//   // Fetch posts and subreddits on component mount and when subreddit changes
//   useEffect(() => {
//     if (subreddit) {
//       dispatch(fetchPosts(subreddit)); // Fetch posts for selected subreddit
//     } else {
//       dispatch(fetchPosts("dan_markel_murder")); // Default subreddit
//     }
//     dispatch(fetchSubreddits()); // Fetch the list of subreddits
//   }, [dispatch, subreddit]);

//   // Get data from Redux store
//   const posts = useSelector((state) => state.posts.posts);
//   const subreddits = useSelector((state) => state.subreddits.subreddits);
//   const loading = useSelector((state) => state.posts.loading);
//   const error = useSelector((state) => state.posts.error);
//   // // Get URL params for subreddit and postId
//   // const { subreddit, postId } = useParams();

//   // Detect search route using location
//   // const location = useLocation();
//   // const isSearch = location.pathname.startsWith("/search");

//   // Retrieve current subreddit and postId from Redux store
//   // const currentSubreddit = useSelector(selectCurrentSubreddit);
//   // const postsStatus = useSelector(selectPostsStatus);
//   // const currentPostId = useSelector(selectCurrentPostId);

//   // const post = useSelector((state) =>
//   //   selectCommentsByPostId(state, postId)
//   // );

//   // Update subreddit and postId when URL params change
//   // useEffect(() => {
//   //   // Check if it's a search route or a subreddit route
//   //   // if (isSearch) {
//   //   //   // Handle search route logic
//   //   //   if (postId && !currentPostId) {
//   //   //     dispatch(setCurrentPostId(postId)); // Set current post ID for the search case
//   //   //     dispatch(fetchPostById(postId)); // Fetch the post by ID (search result)
//   //   //   }
//   //   // } else {
//   //   //   // Handle subreddit route logic
//   //   //   if (subredditName && subredditName !== selectedSubreddit) {
//   //   //     dispatch(setSelectedSubreddit(subredditName));
//   //   //   }
//   //   //   if (subredditName && postsStatus === "idle") {
//   //   //     dispatch(fetchPosts(subredditName)); // Fetch posts for the subreddit
//   //   //   }
//   //   // }
//   //   if (isSearch && postId) {
//   //     // If it's a search route, just set the current post ID
//   //     // dispatch(setCurrentPostId(postId));
//   //     dispatch(fetchPostById(postId));
//   //   } else if (subreddit) {
//   //     // If it's a normal subreddit route, set the subreddit and post
//   //     dispatch(setSelectedSubreddit(subreddit));
//   //     if (postId) dispatch(setCurrentPostId(postId));
//   //   }
//   //   if (subreddit && subreddit !== currentSubreddit) {
//   //     dispatch(setSelectedSubreddit(subreddit));
//   //   }
//   //   if (postId && postId !== postId) {
//   //     console.log("Setting current post ID:", postId);
//   //     dispatch(setCurrentPostId(postId));
//   //   } else if (!postId) {
//   //     dispatch(setCurrentPostId(null)); // Clear post ID if none in URL
//   //   }
//   //   // [subredditName, postId, dispatch, selectedSubreddit, currentPostId];
//   // }, [dispatch, subreddit, postId, isSearch, selectedSubreddit, currentPostId]);

//   // 10/10 rec changes: [dispatch, subredditName, postId, isSearch]
//   return (
//     <div className="app-container">
//       <Header />
//       <aside className="sidebar">
//         <SubredditsList subreddits={subreddits}/>
//       </aside>
//       <main className="main-content">
//         {isSearch ? (
//           <SearchResults />
//         ) : currentPostId ? (
//           <FullPost />
//         ) : (
//           <PostsList selectedSubreddit={currentSubreddit} />
//         )}
//       </main>
//     </div>
//   );
// };

// export default RedditApp;

/* Refactored code */
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchPosts } from "./features/posts/postsSlice";
// import { fetchSubredditsList } from "./features/subreddits/subredditsSlice";
// import {
//   fetchSearchResults,
//   setTerm,
//   selectSearchResults,
//   selectTerm,
//   selectSearchStatus,
// } from "./features/search/searchSlice";
// import { Header } from "./components/Header";
// import SubredditsList from "./features/subreddits/SubredditsList";
// import PostsList from "./features/posts/PostsList";
// import { SearchResults } from "./features/search/SearchResults";

// const RedditApp = () => {
//   const dispatch = useDispatch();
//   const { subreddit } = useParams();

//   // Get the search term and search results from the Redux store
//   const searchTerm = useSelector(selectTerm);
//   const searchResults = useSelector(selectSearchResults);
//   const searchStatus = useSelector(selectSearchStatus);

//   // Get posts and subreddits from Redux
//   const posts = useSelector((state) => state.posts.posts);
//   const subreddits = useSelector((state) => state.subreddits.subreddits);
//   const loading = useSelector((state) => state.posts.loading);
//   const error = useSelector((state) => state.posts.error);

//   // Fetch posts or search results based on the search term
//   useEffect(() => {
//     if (searchTerm) {
//       // If there is a search term, fetch search results
//       dispatch(fetchSearchResults(searchTerm));
//     } else if (subreddit) {
//       // If no search term, fetch posts for the selected subreddit
//       dispatch(fetchPosts(subreddit));
//     } else {
//       // Default subreddit
//       dispatch(fetchPosts("dan_markel_murder"));
//     }

//     dispatch(fetchSubredditsList()); // Fetch the subreddits list
//   }, [dispatch, subreddit, searchTerm]);

//   // Handle search input in Header
//   const handleSearch = (term) => {
//     dispatch(setTerm(term)); // Update search term in Redux
//   };

//   return (
//     <div className="app-container">
//       <Header onSearch={handleSearch} /> {/* Pass handleSearch to Header */}
//       <div className="sidebar">
//         <SubredditsList subreddits={subreddits} />
//       </div>
//       <div className="main-content">
//         {loading && <p>Loading posts...</p>}
//         {error && <p>Error fetching posts: {error}</p>}

//         {/* Conditionally render search results or posts list */}
//         {searchTerm && searchResults.length > 0 ? (
//           <SearchResults results={searchResults} />
//         ) : (
//           <PostsList posts={posts} />
//         )}

//         {/* Handle case where no search results are found */}
//         {searchTerm &&
//           searchResults.length === 0 &&
//           searchStatus === "succeeded" && (
//             <p>No results found for "{searchTerm}".</p>
//           )}
//       </div>
//     </div>
//   );
// };

// export default RedditApp;
