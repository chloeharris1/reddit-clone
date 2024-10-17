import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/utils";

// Fetch a single post by ID
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async ({ subreddit, postId }) => {
    const response = await fetch(
      `${baseUrl}/r/${subreddit}/comments/${postId}.json`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch post by ID: ${response.status}`);
    }
    const data = await response.json();
    return data[0].data.children[0].data; // Post data
  }
);

const currentPostSlice = createSlice({
  name: "currentPost",
  initialState: {
    post: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentPost: (state) => {
      state.post = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentPost } = currentPostSlice.actions;

export default currentPostSlice.reducer;
