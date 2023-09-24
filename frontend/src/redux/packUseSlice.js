import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createPackUse = createAsyncThunk(
  "packUse/createPackUse",
  async (packUseData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/packUse/createPackUse", packUseData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchLastUsedPackUse = createAsyncThunk(
  "packUse/fetchLastUsedPackUse",
  async ({ roomId, userid }, { rejectWithValue }) => {

    try {
      const response = await axios.get(`/packUse/fetchLastUsedPackUse/${roomId}/${userid}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchPackUseByRoom = createAsyncThunk(
  "packUse/fetchPackUseByRoom",
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/packUse/getPackUseByRoom/${roomId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchValidPackUseByRoom = createAsyncThunk(
  "packUse/fetchValidPackUseByRoom",
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/packUse/getValidPackUseByRoom/${roomId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchPackUseByUser = createAsyncThunk(
  "packUse/fetchPackUseByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/packUse/getPackUseByUser/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchValidPackUseByUser = createAsyncThunk(
  "packUse/fetchValidPackUseByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/packUse/getValidPackUseByUser/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchPackUseByRoomAndUser = createAsyncThunk(
  "packUse/fetchPackUseByRoomAndUser",
  async ({ roomId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/packUse/getPackUseByRoomAndUser/${roomId}/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchValidPackUseByRoomAndUser = createAsyncThunk(
  "packUse/fetchValidPackUseByRoomAndUser",
  async ({ roomId, userid }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/packUse/getValidPackUseByRoomAndUser/${roomId}/${userid}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePackUseValidity = createAsyncThunk(
  "packUse/updatePackUseValidity",
  async ({ packUseId, payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/packUse/updatePackUseValidity/${packUseId}`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePackUseRemaining = createAsyncThunk(
  "packUse/updatePackUseRemaining",
  async ({ packUseId, remaining }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/packUse/updatePackUseRemaining/${packUseId}`,
        { remaining }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deletePackUseById = createAsyncThunk(
  "packUse/deletePackUseById",
  async (packUseId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/packUse/deletePackUse/${packUseId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  packUse: null,
  allPackUse: null,
  isLoading: false,
  error: null,
  remaining: null,
};

const packUseSlice = createSlice({
  name: "packUse",
  initialState,
  reducers: {
    setsold: (state, action) => {
      state.remaining = action.payload;
    },
  },
  extraReducers: {
    [createPackUse.pending]: (state) => {
      state.isLoading = true;
    },
    [createPackUse.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.packUse = action.payload;
      state.error = null;
    },
    [createPackUse.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchPackUseByRoom.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPackUseByRoom.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.packUse = action.payload;
      state.error = null;
    },
    [fetchPackUseByRoom.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchLastUsedPackUse.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchLastUsedPackUse.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.packUse = action.payload;
      state.error = null;
    },
    [fetchLastUsedPackUse.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchValidPackUseByRoom.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchValidPackUseByRoom.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.packUse = action.payload;
      state.error = null;
    },
    [fetchValidPackUseByRoom.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchPackUseByUser.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPackUseByUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.packUse = action.payload;
      state.error = null;
    },
    [fetchPackUseByUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchValidPackUseByUser.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchValidPackUseByUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.packUse = action.payload;
      state.error = null;
    },
    [fetchValidPackUseByUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchPackUseByRoomAndUser.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPackUseByRoomAndUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allPackUse = action.payload;
      state.error = null;
    },
    [fetchPackUseByRoomAndUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchValidPackUseByRoomAndUser.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchValidPackUseByRoomAndUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.packUse = action.payload;
      state.error = null;
    },
    [fetchValidPackUseByRoomAndUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updatePackUseValidity.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePackUseValidity.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.packUse = action.payload;
      state.error = null;
    },
    [updatePackUseValidity.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [updatePackUseRemaining.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePackUseRemaining.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.packUse = action.payload;
      state.error = null;
    },
    [updatePackUseRemaining.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deletePackUseById.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePackUseById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.packUse = action.payload;
      state.error = null;
    },
    [deletePackUseById.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default packUseSlice.reducer;
export const { setsold } = packUseSlice.actions;
