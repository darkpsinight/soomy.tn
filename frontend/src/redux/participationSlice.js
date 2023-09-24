import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createParticipation = createAsyncThunk(
  "participation/createParticipation",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(
        "/participations/createParticipation",
        info,
        {
          withCredentials: true,
        }
      );
      dispatch(getUserAndRoomParticipation({ id: info.user, room: info.room }));

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
export const updateParticipation = createAsyncThunk(
  "participation/updateParticipation",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(
        `/participations/updateParticipation/${info.id}`,
        info.data,
        {
          withCredentials: true,
        }
      );

      dispatch(getRoomParticipations(info.room))
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

export const fetchParticipationList = createAsyncThunk(
  "participations/fetchParticipation",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/participations/listParticipations`, {
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
export const fetchUserParticipation = createAsyncThunk(
  "participations/fetchUserParticipation",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/participations/getUserParticipation/${info}`,
       {
        withCredentials: true,
      }
      );
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
export const getRoomParticipations = createAsyncThunk(
  "participations/getRoomParticipations",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/participations/getRoomParticipation/${info}`,
       {
        withCredentials: true,
      }
      );
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
export const getUserAndRoomParticipation = createAsyncThunk(
  "participations/getUserAndRoomParticipation",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/participations/getUserAndRoomParticipation/${info.id}/${info.room}`,
       {
        withCredentials: true,
      }
      );
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
export const getParticipationPaginationUser = createAsyncThunk(
  "participations/getParticipationPaginationUser",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/participations/getParticipationPaginationUser/${info.id}/${info.page}`,
       {
        withCredentials: true,
      }
      );
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
export const deleteParticipation = createAsyncThunk(
  "participations/deleteParticipation",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `/participations/deleteParticipation/${info.user}/${info.room}`,
       {
        withCredentials: true,
      }
      );
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
const participationSlice = createSlice({
  name: "participation",
  initialState: {
    freeCredit:null,
    participationList: null,
    userParticipationList: null,
    roomParticipationList: null,
    participation: null,
    loadingbanParticipation:false,
    banParticipationErrors:null,
    banParticipation:null,
    showModalParticipation: false,
    createdParticipation: null,
    PaginationUser: null,
    LoadingPaginationUser: false,
    PaginationUserErrors: null,
    loadingParticipationList: false,
    participationListErrors: null,
    loadingUserParticipationList: false,
    userParticipationListErrors: null,
    LoadingRoomParticipationList: false,
    roomParticipationListErrors: null,
    loadingUserAndRoomParticipation: false,
    UserAndRoomParticipationErrors: null,
    loadingcreateParticipation: false,
    createParticipationErrors: null,
    loadingdeleteParticipation: false,
    deleteParticipationErrors: null,
  },
  reducers: {
    setFreeCredit : (state, action) =>{
    state.freeCredit = action.payload ;
    },
    clearTransactionErrors: (state) => {
      state.createParticipationErrors = null;
      state.participationListErrors = null;
    },
    clearParticipation: (state) => {
      state.RoomWinnerPagination = null;
      state.userParticipationListErrors = null;
      state.loadingUserParticipationList = false;
    },
    setShowModalParticipation: (state) => {
      state.showModalParticipation = !state.showModalParticipation;
    },
    setCloseModalParticipation: (state) => {
      state.showModalParticipation = false;
    },
  },

  extraReducers: {
    [fetchParticipationList.pending]: (state) => {
      state.loadingParticipationList = true;
    },
    [fetchParticipationList.fulfilled]: (state, action) => {
      state.participationList = action.payload;
      state.loadingParticipationList = false;
      state.participationListErrors = null;
    },
    [fetchParticipationList.rejected]: (state, action) => {
      state.participationListErrors = action.payload;
      state.loadingParticipationList = false;
    },
    [fetchUserParticipation.pending]: (state) => {
      state.loadingUserParticipationList = true;
    },
    [fetchUserParticipation.fulfilled]: (state, action) => {
      state.userParticipationList = action.payload;
      state.loadingUserParticipationList = false;
      state.userParticipationListErrors = null;
    },
    [fetchUserParticipation.rejected]: (state, action) => {
      state.userParticipationListErrors = action.payload;
      state.loadingUserParticipationList = false;
    },

    [getRoomParticipations.pending]: (state) => {
      state.loadingRoomParticipationList = true;
    },
    [getRoomParticipations.fulfilled]: (state, action) => {
      state.roomParticipationList = action.payload;
      state.LoadingRoomParticipationList = false;
      state.roomParticipationListErrors = null;
    },
    [getRoomParticipations.rejected]: (state, action) => {
      state.roomParticipationListErrors = action.payload;
      state.loadingRoomParticipationList = false;
    },
    [getParticipationPaginationUser.pending]: (state) => {
      state.loadingPaginationUser = true;
    },
    [getParticipationPaginationUser.fulfilled]: (state, action) => {
      state.PaginationUser = action.payload;
      state.LoadingPaginationUser = false;
      state.PaginationUserErrors = null;
    },
    [getParticipationPaginationUser.rejected]: (state, action) => {
      state.PaginationUserErrors = action.payload;
      state.loadingPaginationUser = false;
    },
    [getUserAndRoomParticipation.pending]: (state) => {
      state.loadingUserAndRoomParticipation = true;
    },
    [getUserAndRoomParticipation.fulfilled]: (state, action) => {
      state.participation = action.payload;
      state.loadingUserAndRoomParticipation = false;
      state.UserAndRoomParticipationErrors = null;
    },
    [getUserAndRoomParticipation.rejected]: (state, action) => {
      state.UserAndRoomParticipationErrors = action.payload;
      state.loadingUserAndRoomParticipation = false;
    },
    [createParticipation.pending]: (state) => {
      state.loadingcreateParticipation = true;
    },
    [createParticipation.fulfilled]: (state, action) => {
      state.loadingcreateParticipation = false;
      state.createParticipationErrors = null;
      state.createdParticipation = action.payload;
    },
    [createParticipation.rejected]: (state, action) => {
      state.createParticipationErrors = action.payload;
      state.loadingcreateParticipation = false;
    },
    [updateParticipation.pending]: (state) => {
      state.loadingupdateParticipation = true;
    },
    [updateParticipation.fulfilled]: (state, action) => {
      state.loadingupdateParticipation = false;
      state.updateParticipationErrors = null;
      state.updateParticipation = action.payload;
    },
    [updateParticipation.rejected]: (state, action) => {
      state.updateParticipationErrors = action.payload;
      state.loadingupdateParticipation = false;
    },
    [deleteParticipation.pending]: (state) => {
      state.loadingdeleteParticipation = true;
    },
    [deleteParticipation.fulfilled]: (state, action) => {
      state.loadingdeleteParticipation = false;
      state.deleteParticipationErrors = null;
    },
    [deleteParticipation.rejected]: (state, action) => {
      state.deleteParticipationErrors = action.payload;
      state.loadingdeleteParticipation = false;
    },
  },
});

export default participationSlice.reducer;
export const {
  clearTransactionErrors,
  clearParticipation,
  setShowModalParticipation,
  setCloseModalParticipation,
  setFreeCredit
} = participationSlice.actions;