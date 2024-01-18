import { createSlice } from "@reduxjs/toolkit";
 
 
const storedOwner = localStorage.getItem("owner");
 
const initialState = {
  owner: storedOwner || "", 
  status: "idle",
  error: null,
};
 
const ownerSlice = createSlice({
  name: "owner",
  initialState: initialState,
  reducers: {
    setOwner: (state, action) => {
        state.owner = action.payload;
        localStorage.setItem("owner", action.payload);
      },
  },
 
});
export const { setOwner } = ownerSlice.actions;
 
export default ownerSlice.reducer;