import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './emailSlice';
import searchReducer from './searchSlice';
import thunk from 'redux-thunk';
import usersReducer from './userSlice';
import projectReducer from './projectSlice';
import milestoneReducer from './milestoneSlice'
import ownerReducer from './ownerSlice';


const store = configureStore({
  reducer: {
    email: emailReducer,
    search: searchReducer,
    user: usersReducer,
    projects:projectReducer,
    milestones:milestoneReducer,
    owner: ownerReducer,
    // middleware: [thunk]
  },
});

export default store;