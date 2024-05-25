import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    sigInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      (state.loading = false),
        (state.currentUser = action.payload),
        (state.error = null);
    },
    signInFailiure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
    updateingStart: (state) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      (state.loading = false),
        (state.currentUser = action.payload),
        (state.error = null);
    },
    updateFailiure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
    deleteStart: (state) => {
      state.loading = true;
    },
    deleteSuccess: (state, action) => {
      (state.loading = false), (state.currentUser = null), (state.error = null);
    },
    deleteFailiure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
    signOutStart: (state) => {
      state.loading = true;
    },
    signOutSuccess: (state, action) => {
      (state.loading = false), (state.currentUser = null), (state.error = null);
    },
    signOutFailiure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});

export const {
  sigInStart,
  signInSuccess,
  signInFailiure,
  updateingStart,
  updateSuccess,
  updateFailiure,
  deleteStart,
  deleteSuccess,
  deleteFailiure,
  signOutStart,
  signOutSuccess,
  signOutFailiure,
} = userSlice.actions;

export default userSlice.reducer;
