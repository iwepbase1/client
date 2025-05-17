import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state: any, action: any) => {
      state.user = action.payload.userData;
      state.token = action.payload.jwt;
    },
    updateUserData: (state: any, action: any) => {
      state.user = action.payload;
    },
    logout: (state: any) => {
      state.user = {};
      state.token = "";
    },
  },
});

export const { signIn, logout, updateUserData } = AuthSlice.actions;

export default AuthSlice.reducer;
