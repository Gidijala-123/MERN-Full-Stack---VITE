import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    error: null,
    loading: false,
  },
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
