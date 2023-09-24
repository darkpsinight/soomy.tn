import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    sidebarShow: true,
    unfoldable: false,
    showSearch: false,
    utilisateurs: null,
  },
  reducers: {
    setSideBar: (state, action) => {
      // localStorage.clear();
      state.sidebarShow = action.payload;
    },
    sidebarUnfoldable: (state, action) => {
      // localStorage.clear();
      state.unfoldable = action.payload;
    },
    handleClose: (state, action) => {
      // localStorage.clear();
      state.showSearch = false;
    },
    handleShow: (state, action) => {
      // localStorage.clear();
      state.showSearch = true;
    },
    utilisateurs: (state, action) => {
      state.utilisateurs = action.payload; // store the value of users in state
    },
  },
});
export default dashboardSlice.reducer;
export const {
  setSideBar,
  sidebarUnfoldable,
  handleClose,
  handleShow,
  utilisateurs,
} = dashboardSlice.actions;
