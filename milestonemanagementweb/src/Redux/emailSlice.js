import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: 'email',
  initialState: {
    toEmail: [],
    ccEmail: [],
    toEmailType: '',
    ccEmailType: '',
  },
  reducers: {
    setToEmail: (state, action) => {
      state.toEmail = action.payload;
    },
    setCcEmail: (state, action) => {
      state.ccEmail = action.payload;
    },
    setToEmailType: (state, action) => {
      console.log(action.payload);
      state.toEmailType = action.payload;
    },
    setCcEmailType: (state, action) => {
      state.ccEmailType = action.payload;
    },
  },
});

export const {
  setToEmail,
  setCcEmail,
  setToEmailType,
  setCcEmailType,
} = emailSlice.actions;

export default emailSlice.reducer;
