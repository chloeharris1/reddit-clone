import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/posts/postsSlice";
import subredditsReducer from "../features/subreddits/subredditsSlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    subreddits: subredditsReducer,
    search: searchReducer,
  },
});
