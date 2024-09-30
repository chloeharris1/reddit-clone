import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/utils";
import { crimeSubreddits } from "../../utils/utils";

// Thunk to fetch subreddits
export const fetchSubredditsList = createAsyncThunk(
  "subreddits/fetchSubredditsList",
  async () => {
    const subredditPromises = crimeSubreddits.map(async (subreddit) => {
      const response = await fetch(`${baseUrl}/r/${subreddit}/about.json`); // Fetch metadata
      const data = await response.json();
      // console.log(data);
      return {
        image: data.data.icon_img,
        name: data.data.display_name,
        title: data.data.title,
      };
    });

    const subredditsData = await Promise.all(subredditPromises);

    return subredditsData; // Returns an array of subreddit metadata
  }
);

const subredditsSlice = createSlice({
  name: "subreddits",
  initialState: {
    subreddits: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubredditsList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubredditsList.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Store fetched subreddit data in the state
        state.subreddits = action.payload;
      })
      .addCase(fetchSubredditsList.rejected, (state, action) => {
        state.status = "failed";
        // Store fetched subreddit data in the state
        state.error = action.error.message;
      });
  },
});

export default subredditsSlice.reducer;

export const selectSubreddits = (state) => state.subreddits.subreddits;
