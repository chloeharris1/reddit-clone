import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/utils";

// Thunk for fetching search results, site-wide search
export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (term) => {
    const response = await fetch(`${baseUrl}/search.json?q=${term}`);
    const data = await response.json();
    return data.data.children.map((post) => post.data);
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    term: "",
    results: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setTerm: (state, action) => {
      state.term = action.payload;
    },
    clearTerm: (state, action) => {
      state.term = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.results = [];
      });
  },
});

export const selectSearchResults = (state) => state.search.results;

export const selectTerm = (state) => state.search.term;

export const selectSearchStatus = (state) => state.search.status;

export default searchSlice.reducer;

export const { setTerm, clearTerm } = searchSlice.actions;
