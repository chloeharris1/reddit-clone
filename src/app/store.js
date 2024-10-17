import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/posts/postsSlice";
import currentPostReducer from "../features/currentPost/currentPostSlice";
import subredditsReducer from "../features/subreddits/subredditsSlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    currentPost: currentPostReducer,
    subreddits: subredditsReducer,
    search: searchReducer,
  },
});
