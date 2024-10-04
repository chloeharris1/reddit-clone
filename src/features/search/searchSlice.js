import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/utils";

// Thunk to fetch search results from all defined subreddits (Old thunk)

// export const fetchSearchResults = createAsyncThunk(
//   "search/fetchSearchResults",
//   async ({ searchTerm, subreddits }) => {
//     const allResults = [];

//     //  Iterate over all subreddits to fetch search results
//     for (let subreddit of subreddits) {
//       const response = await fetch(
//         `${baseUrl}/r/${subreddit}/search.json?q=${searchTerm}&restrict_sr=on` // Restrict search to specific subreddits i/o site-wide search across all subreddits
//       );
//       const data = await response.json();
//       const results = data.data.children.map((child) => child.data);
//       console.log(results);
//       allResults.push(...results);
//     }
//     console.log("All search results:", allResults);
//     return allResults; // Return combined results from all subreddits
//   }
// );

// Thunk for fetching search results by filtering existing posts in state

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (searchTerm, { getState }) => {
    const state = getState();
    const allPosts = state.posts.posts; // Access posts array inside 'posts' slice
    console.log("All posts:", allPosts);

    // Convert the search term to lowercase
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    console.log("Search term:", lowerCaseSearchTerm);

    // Filter posts by search term (title or selftext match)
    const filteredPosts = allPosts.filter((post) => {
      console.log("Current post:", post); // Log each post being checked
      return (
        post.title.toLowerCase().includes(lowerCaseSearchTerm) || // Match by title
        (post.selftext &&
          post.selftext.toLowerCase().includes(lowerCaseSearchTerm)) // Match by selftext if it exists
      );
    });

    console.log("Filtered posts:", filteredPosts); // Log filtered posts

    return filteredPosts; // Return the filtered results
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload; // Store the fetched search results
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.results = [];
      });
  },
});

export const selectSearchResults = (state) => state.search.results;
export const selectSearchStatus = (state) => state.search.status;

export default searchSlice.reducer;
