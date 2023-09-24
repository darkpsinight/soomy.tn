import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createPurchase = createAsyncThunk(
  "purchase/createPurchase",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post("/purchase/createPurchase", info);

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

export const getPurchase = createAsyncThunk(
  "purchase/getPurchase",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/purchase/getPurchase/${info}`);

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

export const getPurchaseDashboard = createAsyncThunk(
  "purchase/getPurchase",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/purchase/getPurchase/${info.id}`);

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

export const getSelectedPurchase = createAsyncThunk(
  "purchase/getSelectedPurchase",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/purchase/getSelectedPurchase/${info}`);

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

export const updatePurchase = createAsyncThunk(
  "purchase/updatePurchase",
  async ({ info, payload }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/purchase/updatePurchase/${info}`, payload);

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

const packPurchase = createSlice({
  name: "purchase",
  initialState: {
    updateLoading: null,
    errors: null,
    purchasedPacks: null,
    // updatedPack: null,
  },
  reducers: {},
  extraReducers: {
    [createPurchase.pending]: (state) => {
      state.updateLoading = true;
    },
    [createPurchase.fulfilled]: (state, action) => {
      state.updateLoading = false;
      state.errors = null;
      state.purchasedPacks = action.payload;
    },
    [createPurchase.rejected]: (state, action) => {
      state.updateErrors = action.payload;
      state.updateLoading = false;
    },
    [getPurchase.pending]: (state) => {
      state.updateLoading = true;
    },
    [getPurchase.fulfilled]: (state, action) => {
      state.updateLoading = false;
      state.errors = null;
      state.purchasedPacks = action.payload;
    },
    [getPurchase.rejected]: (state, action) => {
      state.updateErrors = action.payload;
      state.updateLoading = false;
    },
    // 'getPurchase.pending.type' to fix and empty state of purchasedPacks when view other users purchased packs in dashboard
    [getPurchase.pending.type]: (state) => {
      state.updateLoading = true;
      state.purchasedPacks = null;
      state.updateErrors = null;
    },
    [getPurchaseDashboard.pending]: (state) => {
      state.updateLoading = true;
      state.updateErrors = null;
    },
    [getPurchaseDashboard.fulfilled]: (state, action) => {
      state.updateLoading = false;
      state.errors = null;
      state.purchasedPacks = action.payload;
    },
    [getPurchaseDashboard.rejected]: (state, action) => {
      state.updateErrors = action.payload;
      state.updateLoading = false;
    },
    // 'getPurchaseDashboard.pending.type' to fix and empty state of purchasedPacks when view other users purchased packs in dashboard
    [getPurchaseDashboard.pending.type]: (state) => {
      state.updateLoading = true;
      state.purchasedPacks = null;
      state.updateErrors = null;
    },
    [getSelectedPurchase.pending]: (state) => {
      state.updateLoading = true;
    },
    [getSelectedPurchase.fulfilled]: (state) => {
      state.updateLoading = false;
      state.errors = null;
    },
    [getSelectedPurchase.rejected]: (state, action) => {
      state.updateErrorsSelected = action.payload;
      state.updateLoading = false;
    } /* 
    [updatePurchase.pending]: (state) => {
      state.updateLoading = true;
    },
    [updatePurchase.fulfilled]: (state, action) => {
      state.updateLoading = false;
      state.errors = null;
      state.updatedPack = action.payload;
    },
    [updatePurchase.rejected]: (state, action) => {
      state.updateErrors = action.payload;
      state.updateLoading = false;
    }, */,
  },
});

export default packPurchase.reducer;
