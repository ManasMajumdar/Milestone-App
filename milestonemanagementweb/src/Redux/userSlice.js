import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../api';

const initialState = {
  user: [],
  status: 'idle',
  error: null,
};

// <_--Get-->
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try { 
    const response = await axios.get(`${baseURL}/v1/user`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error; 
  }
});

// <--Delete-->
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  try {
    await axios.delete(`${baseURL}/v1/user/${userId}`);
    return userId;
  } catch (error) {
    console.error("Delete Failed: ",error);
    throw error;
  }
});

// <--Update-->
export const updateUserStatus = createAsyncThunk('users/updateUserStatus',async ({ userId, status }) => {
    try {
      await axios.put(`${baseURL}/v1/user/${userId}/${status}`);
      return { userId, status };
    } catch (error) {
      console.error("Update Failed :",error);
      throw error;
    }
  }
);

// <--Post-->
export const createUser = createAsyncThunk('users/createUser', async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/milestone/v1/user`, userData);
    return response.data;
  } catch (error) {
    console.error("Failed in adding user :",error);
    throw error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = state.user.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, status } = action.payload;
        state.user = state.user.map((data) =>
        data.id === userId ? { ...data, isActive:status } : data
        );
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;