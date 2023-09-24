import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createRoom = createAsyncThunk(
  "room/createRoom",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("/rooms/createRoom", info, {
        withCredentials: true,
      });
      dispatch(fetchRoomList());
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
export const deleteRoom = createAsyncThunk(
  "room/deleteRoom",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`/rooms/deleteRoom/${info}`, {
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
export const updateRoom = createAsyncThunk(
  "room/updateRoom",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/rooms/updateRoom/${info.id}`, info.data, {
        withCredentials: true,
      });
      dispatch(fetchRoom(info.id));
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
export const updateflag = createAsyncThunk(
  "room/updateflag",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(
        `/rooms/updateflag/${info.id}`,
        {},
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      dispatch(fetchRoomList());
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

export const fetchRoomList = createAsyncThunk(
  "room/fetchRoomList",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/rooms/getAllAuctions`, {
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
export const roomDelay = createAsyncThunk(
  "room/roomDelay",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/rooms/roomDelay/${info}`, {
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
export const fetchRoomListPagination = createAsyncThunk(
  "room/fetchRoomListPagination",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/rooms/getAuctions`, info, {
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
export const getAuctionsByCategory = createAsyncThunk(
  "room/getAuctionsByCategory",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/rooms/getAuctionsByCategory`, info, {
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
export const getAuctionsByRoomCategory = createAsyncThunk(
  "room/getAuctionsByRoomCategory",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/rooms/getAuctionsByRoomCategory`, info, {
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
export const getAuctionsByFeature = createAsyncThunk(
  "room/getAuctionsByFeature",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/rooms/getAuctionsByFeature`, info, {
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
export const fetchRoomWinnerPagination = createAsyncThunk(
  "room/fetchRoomWinnerPagination",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/rooms/roomWinner/${info.id}/${info.page}`, {
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
export const fetchRoom = createAsyncThunk(
  "room/fetchRoom",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/rooms/getAuctionById/${info}`, {
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
const RoomSlice = createSlice({
  name: "room",
  initialState: {
    RoomList: null,
    createdRoom: null,
    editedRoom: {
      nameOfroom: "",
      description: "",
      product: "",
      startDate: "",
      nbParticipant: "",
      capacity: "",
      mise: "",
      participationPrice: "",
      roomCategory: "",
      niveau: "",
    },
    RoomWinnerPagination: null,
    loadingRoomWinnerPagination: false,
    RoomWinnerErrorsPagination: null,
    loadingCreateRoom: false,
    auctions: null,
    loadingRoomListPagination: false,
    RoomListErrorsPagination: null,
    createRoomErrors: null,
    loadingUpdateRoom: false,
    updateRoomErrors: null,
    loadingRoomList: false,
    RoomListErrors: null,
    roomEditSuccess: false,
    auction: null,
    loadingRoom: false,
    RoomErrors: null,
    loadingupdateflag: false,
    updateflagErrors: null,
    idParam: null,
  },
  reducers: {
    editRoom: (state, action) => {
      state.editedRoom = action.payload;
    },
    clearRoomErrors: (state) => {
      state.createRoomErrors = null;
      state.RoomListErrors = null;
      state.createdRoom = null;
      state.updateRoomErrors = null;
      state.roomEditSuccess = false;
      state.Room = null;
    },
    clearRoomState: (state) => {
      state.RoomList = null;
      state.RoomListErrors = null;
      state.loadingRoom = false;
      state.RoomListErrors = null;
    },
    cleanRoom: (state) => {
      state.auction = null;
      state.RoomErrors = null;
      state.loadingRoom = false;
    },
    setIdParam: (state, action) => {
      state.idParam = action.payload;
    },
    cleanIdParam: (state) => {
      state.idParam = null;
    },
  },

  extraReducers: {
    [createRoom.pending]: (state) => {
      state.loadingCreateRoom = true;
    },
    [createRoom.fulfilled]: (state, action) => {
      state.createdRoom = action.payload;
      state.loadingCreateRoom = false;
      state.createRoomErrors = null;
    },
    [createRoom.rejected]: (state, action) => {
      state.createRoomErrors = action.payload;
      state.loadingCreateRoom = false;
    },
    [fetchRoomList.pending]: (state) => {
      state.loadingRoomList = true;
    },
    [fetchRoomList.fulfilled]: (state, action) => {
      state.auctions = action.payload;
      state.loadingRoomList = false;
      state.RoomListErrors = null;
    },
    [fetchRoomList.rejected]: (state, action) => {
      state.RoomListErrors = action.payload;
      state.loadingRoomList = false;
    },
    [roomDelay.pending]: (state) => {
      state.loadingRoomList = true;
    },
    [roomDelay.fulfilled]: (state, action) => {
      state.loadingRoomList = false;
      state.RoomListErrors = null;
    },
    [roomDelay.rejected]: (state, action) => {
      state.RoomListErrors = action.payload;
      state.loadingRoomList = false;
    },
    [getAuctionsByCategory.pending]: (state) => {
      state.loadingRoomList = true;
    },
    [getAuctionsByCategory.fulfilled]: (state, action) => {
      state.RoomList = action.payload;
      state.loadingRoomList = false;
      state.RoomListErrors = null;
    },
    [getAuctionsByCategory.rejected]: (state, action) => {
      state.RoomListErrors = action.payload;
      state.loadingRoomList = false;
    },
    [getAuctionsByRoomCategory.pending]: (state) => {
      state.loadingRoomList = true;
    },
    [getAuctionsByRoomCategory.fulfilled]: (state, action) => {
      state.RoomList = action.payload;
      state.loadingRoomList = false;
      state.RoomListErrors = null;
    },
    [getAuctionsByRoomCategory.rejected]: (state, action) => {
      state.RoomListErrors = action.payload;
      state.loadingRoomList = false;
    },
    [getAuctionsByFeature.pending]: (state) => {
      state.loadingRoomList = true;
    },
    [getAuctionsByFeature.fulfilled]: (state, action) => {
      state.RoomList = action.payload;
      state.loadingRoomList = false;
      state.RoomListErrors = null;
    },
    [getAuctionsByFeature.rejected]: (state, action) => {
      state.RoomListErrors = action.payload;
      state.loadingRoomList = false;
    },
    [fetchRoomListPagination.pending]: (state) => {
      state.loadingRoomListPagination = true;
    },
    [fetchRoomListPagination.fulfilled]: (state, action) => {
      state.auctions = action.payload;
      state.loadingRoomListPagination = false;
      state.RoomListErrorsPagination = null;
    },
    [fetchRoomListPagination.rejected]: (state, action) => {
      state.RoomListErrorsPagination = action.payload;
      state.loadingRoomListPagination = false;
    },
    [fetchRoomWinnerPagination.pending]: (state) => {
      state.loadingRoomWinnerPagination = true;
    },
    [fetchRoomWinnerPagination.fulfilled]: (state, action) => {
      state.RoomWinnerPagination = action.payload;
      state.loadingRoomWinnerPagination = false;
      state.RoomWinnerErrorsPagination = null;
    },
    [fetchRoomWinnerPagination.rejected]: (state, action) => {
      state.RoomWinnerErrorsPagination = action.payload;
      state.loadingRoomWinnerPagination = false;
    },
    [fetchRoom.pending]: (state) => {
      state.loadingRoom = true;
    },
    [fetchRoom.fulfilled]: (state, action) => {
      state.auction = action.payload;
      state.loadingRoom = false;
      state.RoomErrors = null;
    },
    [fetchRoom.rejected]: (state, action) => {
      state.RoomErrors = action.payload;
      state.loadingRoom = false;
    },
    [deleteRoom.pending]: (state) => {
      state.loadingRoomList = true;
    },
    [deleteRoom.fulfilled]: (state, action) => {
      state.loadingRoomList = false;
      state.RoomListErrors = null;
    },
    [deleteRoom.rejected]: (state, action) => {
      state.RoomListErrors = action.payload;
      state.loadingRoomList = false;
    },
    [updateRoom.pending]: (state) => {
      state.loadingUpdateRoom = true;
    },
    [updateRoom.fulfilled]: (state, action) => {
      state.loadingUpdateRoom = false;
      state.updateRoomErrors = null;
      state.roomEditSuccess = true;
    },
    [updateRoom.rejected]: (state, action) => {
      state.updateRoomErrors = action.payload;
      state.loadingUpdateRoom = false;
      state.roomEditSuccess = false;
    },
    [updateflag.pending]: (state) => {
      state.loadingupdateflag = true;
    },
    [updateflag.fulfilled]: (state, action) => {
      state.loadingupdateflag = false;
      state.updateflagErrors = null;
      state.roomEditSuccess = true;
    },
    [updateflag.rejected]: (state, action) => {
      state.updateflagErrors = action.payload;
      state.loadingupdateflag = false;
      state.roomEditSuccess = false;
    },
  },
});

export default RoomSlice.reducer;
export const {
  editRoom,
  clearRoomErrors,
  clearRoomState,
  cleanRoom,
  setIdParam,
  cleanIdParam,
} = RoomSlice.actions;
