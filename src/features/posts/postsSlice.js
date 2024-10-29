import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/utils";

// Thunk to fetch subreddit posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (subreddit) => {
    const response = await fetch(`${baseUrl}/r/${subreddit}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data);
    return data.data.children.map((child) => child.data);
  }
);

// Thunk to fetch post comments
export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async ({ subreddit, postId }) => {
    const response = await fetch(
      `${baseUrl}/r/${subreddit}/comments/${postId}.json`
    );
    const data = await response.json();
    // The comments are in the second element of the array
    return data[1].data.children.map((child) => child.data);
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    comments: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Store fetched subreddit data in the state
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        // Store fetched subreddit data in the state
        state.error = action.error.message;
      })
      // Handling comment fetching
      .addCase(fetchComments.pending, (state, action) => {
        const { postId } = action.meta.arg; // contains the object passed into the thunk {subreddit, postId}
        state.comments[postId] = { status: "loading", comments: [] };
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId } = action.meta.arg;
        state.comments[postId] = {
          status: "succeeded",
          comments: action.payload,
        };
      })
      .addCase(fetchComments.rejected, (state, action) => {
        const { postId } = action.meta.arg;
        state.comments[postId] = {
          status: "failed",
          comments: [],
          error: action.error.message,
        };
      });
  },
});

// Action creators
export const { setSelectedSubreddit, setCurrentPostId } = postsSlice.actions;

// Selectors
export const selectPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.status;
export const selectCommentsByPostId = (state, postId) =>
  state.posts.comments[postId]?.comments || [];

export default postsSlice.reducer;
