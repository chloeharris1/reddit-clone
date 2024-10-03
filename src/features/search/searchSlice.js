import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/utils";

// Thunk to fetch search results from all defined subreddits

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async ({ searchTerm, subreddits }) => {
    const allResults = [];

    //  Iterate over all subreddits to fetch search results
    for (let subreddit of subreddits) {
      const response = await fetch(
        `${baseUrl}/r/${subreddit}/search.json?q=${searchTerm}&restrict_sr=on` // Restrict search to specific subreddits i/o site-wide search across all subreddits
      );
      const data = await response.json();
      const results = data.data.children.map((child) => child.data);
      console.log(results);
      allResults.push(...results);
    }
    console.log("All search results:", allResults);
    return allResults; // Return combined results from all subreddits
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
