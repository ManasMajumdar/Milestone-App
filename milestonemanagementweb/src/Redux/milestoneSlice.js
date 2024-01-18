import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../api";

const initialState = {
  milestones: [],
  status: "idle",
  error: null,
};

export const getMilestones = createAsyncThunk(
  "milestones/getMilestones",
  async () => {
    try {
      const response = await axios.get(
        `${baseURL}/v1/project/milestones`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching milestones:", error);
      throw error;
    }
  }
);

export const getMilestonesById = createAsyncThunk(
  "milestones/getMilestonesById",
  async (id) => {
    try {
      const response = await axios.get(`${baseURL}/v1/project/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching milestones by ID:", error);
      throw error;
    }
  }
);

export const updatedMilestones = createAsyncThunk(
  "milestones/updateMilestones",
  async ({ id, milestoneData }) => {
    try {
      const response = await axios.put(
        `${baseURL}/v1/project/${id}/milestone`,
        milestoneData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating milestones:", error);
      throw error;
    }
  }
);

export const addMilestones = createAsyncThunk(
  "milestones/addMilestone",
  async ({ projectId, selectedMilestones }) => {
    try {
      const response = await axios.post(
        `${baseURL}/v1/project/${projectId}/milestones`,
        selectedMilestones
      );
      return response.data;
    } catch (error) {
      console.error("Error posting milestone:", error);
      throw error;
    }
  }
);

const milestoneSlice = createSlice({
  name: "milestones",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMilestones.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMilestones.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.milestones = action.payload;
      })
      .addCase(getMilestones.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getMilestonesById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMilestonesById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.milestones = action.payload;
      })
      .addCase(getMilestonesById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.milestones = [];
      })
      .addCase(addMilestones.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMilestones.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("Milestone posted successfully:", action.payload);
      })
      .addCase(addMilestones.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updatedMilestones.fulfilled, (state, action) => {
      console.log(action.payload);
      })
      .addCase(updatedMilestones.rejected, (state, action) => {
        console.error("Error updating project:", action.error);
      });
  },
});

export default milestoneSlice.reducer;
