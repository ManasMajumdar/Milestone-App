import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseURL from "../api";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (searchTerm) => {
    let apiUrl = `${baseURL}/v1/user`;
    if (searchTerm) {
      apiUrl += `?searchText=${searchTerm}`;
    }
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("API request failed");
    }
    const data = await response.json();
    return data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTerm: "",
    searchResults: [],
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchResults: (state, action) => {
      const { userId, status } = action.payload;

      const userIndex = state.searchResults.findIndex(
        (user) => user.id === userId
      );

      if (userIndex !== -1) {
        state.searchResults[userIndex].isActive = status;
      }
    },
    deleteSearchResults: (state, action) => {
      const userIdToDelete = action.payload;
      state.searchResults = state.searchResults.filter(
        (user) => user.id !== userIdToDelete
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.error = "API request failed";
      });
  },
});

export const {
  setSearchTerm,
  setSearchResults,
  updateUserStatusInSearch,
  deleteSearchResults,
} = searchSlice.actions;
export default searchSlice.reducer;
