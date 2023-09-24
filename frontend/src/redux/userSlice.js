import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchUserParticipation } from "./participationSlice";
import { getPurchase, getSelectedPurchase } from "./packPurchaseSlice";

export const postNewUser = createAsyncThunk(
  "user/postNewUser",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post("/users/register", info);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error?.response?.data?.errors?.password?.msg
          ? error?.response?.data?.errors?.password?.msg
          : error?.response?.data?.errors?.username?.msg
          ? error?.response?.data?.errors?.username?.msg
          : error?.response?.data?.errors?.email?.msg
      );
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(
        "/users/user",
        { withCredentials: true },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      if (res.data?.user?._id) {
        // if logged in
        await dispatch(getPurchase(res.data?.user?._id)); // get all purchased packs after getting user info
        // await dispatch(getSelectedPurchase(res.data?.user?._id)); // get selected purchased pack
        await dispatch(fetchUserParticipation(res.data?.user?._id)); // then run get user participation action
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get("/users/getAllUsers", {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post("/users/login", info);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);
export const logout = createAsyncThunk(
  "user/logout",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/users/logout",
        { withCredentials: true },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      window.location.reload();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/users/update/${info.id}`, info.data, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      dispatch(getUser());
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(
        `/users/updatePassword/${info.id}`,
        info.data,
        { withCredentials: true },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      dispatch(getUser());
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.msg
          ? error.response.data.msg
          : error?.response?.data?.errors?.password?.msg
          ? error?.response?.data?.errors?.password?.msg
          : null
      );
    }
  }
);
export const updateImage = createAsyncThunk(
  "user/addnewpicture",
  async (info, { rejectWithValue, dispatch }) => {
    const formData = new FormData();
    formData.append("image", info.file);
    try {
      const res = await axios.put(
        `/users/image/${info.id}`,
        formData,
        { withCredentials: true },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      dispatch(getUser());
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);

export const createCredit = createAsyncThunk(
  "user/createCredit",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("/users/createCredit", info);
      dispatch(getUser());

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);

// on delete pack, will trigger this action to remove the pack credit value from total user credit
export const reduceCredit = createAsyncThunk(
  "user/reduceCredit",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("/users/reduceCredit", info);
      dispatch(getUser());
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);

export const updateBookmarks = createAsyncThunk(
  "bookmarks/updateBookmarks",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(
        `/users/updateBookmarks/${info.id}`,
        info.data,
        { withCredentials: true }
      );
      dispatch(getUser());
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);
export const deleteBookmarks = createAsyncThunk(
  "bookmarks/deleteBookmarks",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(
        `/users/deleteBookmarks/${info.id}`,
        info.data,
        { withCredentials: true }
      );
      dispatch(getUser());
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    montant: null,
    registerErrors: null,
    registerLoading: false,
    loginErrors: null,
    loading: false,
    connexionLoading: false,
    updateBookmarksErrors: null,
    updateBookmarksLoading: false,
    errors: false,
    show: null,
    showModal: null,
    updateShow: null,
    updateErrors: null,
    updateLoading: false,
    userInfo: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    isAuth: localStorage.getItem("isAuth")
      ? Boolean(localStorage.getItem("isAuth"))
      : false,
    responsePayload: null,
    modalTab: 0,
  },
  reducers: {
    setShowModal: (state) => {
      state.show = !state.show;
    },
    setModalTab: (state, action) => {
      state.modalTab = action.payload;
    },
    setCloseModal: (state) => {
      state.show = false;
    },
    setShowModalCredit: (state) => {
      state.showModal = !state.showModal;
    },
    setCloseModalCredit: (state) => {
      state.showModal = false;
    },
    setsold: (state, action) => {
      state.montant = action.payload;
    },
    setResponsePayload: (state, action) => {
      state.responsePayload = action.payload;
    },
    clearUpdate: (state, action) => {
      state.updateShow = null;
      state.updateErrors = null;
      state.updateLoading = false;
    },
  },
  extraReducers: {
    [postNewUser.pending]: (state) => {
      state.loading = true;
    },
    [postNewUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload.user;
      state.isAuth = action.payload.isAuth;
      state.loading = false;
      state.registerErrors = null;
      localStorage.setItem("user", JSON.stringify(action?.payload?.user));
      localStorage.setItem("isAuth", action?.payload?.isAuth);
    },
    [postNewUser.rejected]: (state, action) => {
      state.registerErrors = action.payload;
      state.loading = false;
      state.isAuth = false;
      localStorage.setItem("user", JSON.stringify(null));
      localStorage.setItem("isAuth", true);
    },
    [login.pending]: (state) => {
      state.connexionLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.connexionLoading = false;
      state.errors = null;
    },
    [login.rejected]: (state, action) => {
      state.loginErrors = action.payload;
      state.isAuth = false;
      state.connexionLoading = false;
    },
    [getUser.pending]: (state) => {
      state.connexionLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload.user;
      state.isAuth = action.payload.isAuth;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("isAuth", action.payload.isAuth);
      state.loginErrors = null;
      state.connexionLoading = false;
    },
    [getUser.rejected]: (state, action) => {
      localStorage.setItem("user", JSON.stringify(null));
      localStorage.setItem("isAuth", false);
      state.loginErrors = action.payload;
      state.connexionLoading = false;
    },
    [getAllUsers.pending]: (state) => {
      state.connexionLoading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.loginErrors = null;
      state.connexionLoading = false;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loginErrors = action.payload;
      state.connexionLoading = false;
    },
    [logout.pending]: (state) => {
      state.connexionLoading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.userInfo = null;
      state.isAuth = false;
      state.loginErrors = null;
      state.connexionLoading = false;
      localStorage.setItem("user", null);
      localStorage.setItem("isAuth", false);
    },
    [updateUser.pending]: (state) => {
      state.updateLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.updateLoading = false;
      state.updateErrors = null;
      state.updateShow = true;
    },
    [updateUser.rejected]: (state, action) => {
      state.updateErrors = action.payload;
      state.updateLoading = false;
    },
    [logout.rejected]: (state, action) => {
      state.loginErrors = action.payload;
      state.connexionLoading = false;
    },
    [updatePassword.pending]: (state) => {
      state.updateLoading = true;
    },
    [updatePassword.fulfilled]: (state, action) => {
      state.updateLoading = false;
      state.updateErrors = null;
      state.updateShow = true;
    },
    [updatePassword.rejected]: (state, action) => {
      state.updateErrors = action.payload;
      state.updateLoading = false;
    },
    [updateImage.pending]: (state) => {
      state.updateImageLoading = true;
    },
    [updateImage.fulfilled]: (state, action) => {
      state.updateImageLoading = false;
      state.updateErrors = null;
    },
    [updateImage.rejected]: (state, action) => {
      state.updateErrors = action.payload;
      state.updateImageLoading = false;
    },
    [createCredit.pending]: (state) => {
      state.updateLoading = true;
    },
    [createCredit.fulfilled]: (state, action) => {
      state.updateLoading = false;
      state.errors = null;
      state.creditStatus = action.payload;
    },
    [createCredit.rejected]: (state, action) => {
      state.updateErrors = action.payload;
      state.updateLoading = false;
    },
    [reduceCredit.pending]: (state) => {
      state.updateLoading = true;
    },
    [reduceCredit.fulfilled]: (state, action) => {
      state.updateLoading = false;
      state.errors = null;
      state.creditStatus = action.payload;
    },
    [reduceCredit.rejected]: (state, action) => {
      state.updateErrors = action.payload;
      state.updateLoading = false;
    },
    [updateBookmarks.pending]: (state) => {
      state.updateBookmarksLoading = true;
    },
    [updateBookmarks.fulfilled]: (state, action) => {
      state.updateBookmarksLoading = false;
      state.updateBookmarksErrors = null;
    },
    [updateBookmarks.rejected]: (state, action) => {
      state.updateBookmarksErrors = action.payload;
      state.updateBookmarksLoading = false;
    },
    [deleteBookmarks.pending]: (state) => {
      state.updateBookmarksLoading = true;
    },
    [deleteBookmarks.fulfilled]: (state, action) => {
      state.updateBookmarksLoading = false;
      state.updateBookmarksErrors = null;
    },
    [deleteBookmarks.rejected]: (state, action) => {
      state.updateBookmarksErrors = action.payload;
      state.updateBookmarksLoading = false;
    },
  },
});
export default userSlice.reducer;
export const {
  setShowModal,
  setCloseModal,
  setShowModalCredit,
  setCloseModalCredit,
  setsold,
  setResponsePayload,
  clearUpdate,
  setModalTab,
} = userSlice.actions;
