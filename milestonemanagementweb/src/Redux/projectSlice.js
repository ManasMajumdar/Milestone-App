import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../api";

const initialState = {
  projects: [],
  status: "idle",
  error: null,
  project:[]
};

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (projectData) => {
    try {
      const response = await axios.post(
        `${baseURL}/v1/projects`,
        projectData
      );
      return response.data;
    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
    }
  }
);

export const getAllProjects = createAsyncThunk('projects/getAllProjects', async (name) => {
    try {
      const response = await axios.get(`${baseURL}/v1/projects/project?name=${name}`);
      return response?.data;
    } 
    catch (error) {
     return [];
    }
});

export const getAllProjectsByOwner = createAsyncThunk('projects/getAllProjects', async (email) => {
  try {
    const response = await axios.get(`${baseURL}/v1/projects?owner=${email}`);
    console.log("Hello",response.data);
    return response.data;
  } 
  catch (error) {
   return [];
  }
});


export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, projectData }) => {
    try {
      const response = await axios.put(
        `${baseURL}/v1/projects/${id}`,
        projectData
      );
      return response.data; 
    } catch (error) {
      console.error("Error updating project:", error);
      throw error; 
    }
  }
);

export const getProjectById = createAsyncThunk(
  'projects/getProjectById',
  async (id) => {
    try {
      const response = await axios.get(`${baseURL}/v1/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project by ID ${id}:`, error);
      throw error;
    }
  }
);

export const getProjectByName = createAsyncThunk(
  'projects/getProjectByName',
  async (name) => {
    try {
      const response = await axios.get(`${baseURL}/v1/projects/project?name=${name}`);
      return response.data;
    } 
    catch (error) {
      return [];
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        console.log(state);
        console.log(action);
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        console.log(state);
        console.log(action);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const updatedProject = action.payload;
        console.log(updateProject);
        const index = state.projects.findIndex(
          (project) => project.id === updatedProject.id
        );
        if (index !== -1) {
          state.projects[index] = updatedProject;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        console.error("Error updating project:", action.error);
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.project = [action.payload];
      })
      .addCase(getProjectById.rejected, (state, action) => {
        console.error('Error fetching project by ID:', action.error.message);
      });
  },
});

export default projectSlice.reducer;