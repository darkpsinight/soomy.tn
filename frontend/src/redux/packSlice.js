import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createPack = createAsyncThunk(
  "Pack/createPack",
  async (info, { rejectWithValue, dispatch }) => {
    console.log(info.Packlist)
    const formData = new FormData();
    formData.append("image", info.file);
    formData.append("pack", JSON.stringify(info.Packlist));
    try {
      const res = await axios.post("/packs/createpack", formData, {
        withCredentials: true,
      });
      dispatch(fetchPackList())
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
export const deletePack = createAsyncThunk(
  "Pack/deletePack",
  async (info, { rejectWithValue,dispatch }) => {
    try {
      const res = await axios.delete(`/Packs/deletePack/${info.id}`, {
        withCredentials: true,
      });
      dispatch(fetchPackList({page: info?.page}))
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
export const fetchPackList = createAsyncThunk(
  "Pack/fetchPack",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/Packs/getPacks`,info, {
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
export const getTotalPacks = createAsyncThunk(
  "Pack/getTotalPacks",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/Packs/getTotalPacks`, {
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
export const updatePack = createAsyncThunk(
  'Packs/updatePack',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/Packs/updatePack/${info.id}`, info.data, {
        withCredentials: true,
      });
      dispatch(fetchPackList({page: info?.page}));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updatePackImage = createAsyncThunk(
  "Pack/updateimagePack",
  async (info, { rejectWithValue, dispatch }) => {
    const formData = new FormData();
    formData.append("image", info.file);
    try {
      const res = await axios.put(`/Packs/updatePackimage/${info.id}`, formData, {
        withCredentials: true,
      });
      dispatch(fetchPackList({page: info?.page} ));
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

const PackSlice = createSlice({
  name: "Pack",
  initialState: {
    Packs: null,
    PackTotalList: null,
    createdPack:null,
    loadingCreatePack: false,
    loadingUpdatePack: false,
    editedPack:{ name:"",
    Description:"",
    },
    PackeditSuccess:false,
    PackImageEditSuccess:false,
    createPackErrors: null,
    updatePackErrors: null,
    loadingPackList: false,
    PackListErrors: null,
  },
  reducers: {
    editPack: (state,action) => {
      state.editedPack=action.payload
    },
    clearPackErrors: (state) => {
      state.createPackErrors= null;
      state.PackListErrors = null;
      state.createdPack = null;
      state.updatePackErrors = null;
      state.PackeditSuccess = false ;
      state.PackImageEditSuccess = false ;
  }
  },

  extraReducers: {
    [createPack.pending]: (state) => {
      state.loadingCreatePack = true;
    },
    [createPack.fulfilled]: (state, action) => {
      state.createdPack = action.payload;
      state.loadingCreatePack = false;
      state.createPackErrors = null;
    },
    [createPack.rejected]: (state, action) => {
      state.createPackErrors = action.payload;
      state.loadingCreatePack = false;
    },
    [fetchPackList.pending]: (state) => {
      state.loadingPackList = true;
    },
    [fetchPackList.fulfilled]: (state, action) => {
      state.Packs = action.payload;
      state.loadingPackList = false;
      state.PackListErrors = null;
    },
    [fetchPackList.rejected]: (state, action) => {
      state.PackListErrors = action.payload;
      state.loadingPackList = false;},
    [getTotalPacks.pending]: (state) => {
      state.loadingPackList = true;
    },
    [getTotalPacks.fulfilled]: (state, action) => {
      state.Packs = action.payload;
      state.PackTotalList = action.payload;
      state.loadingPackList = false;
      state.PackListErrors = null;
    },
    [getTotalPacks.rejected]: (state, action) => {
      state.PackListErrors = action.payload;
      state.loadingPackList = false;},
    [deletePack.pending]: (state) => {
      state.loadingPackList = true;
    },
    [deletePack.fulfilled]: (state, action) => {
      state.loadingPackList = false;
      state.PackListErrors = null;
    },
    [deletePack.rejected]: (state, action) => {
      state.PackListErrors = action.payload;
      state.loadingPackList = false;
    },
    [updatePack.pending]: (state) => {
      state.loadingUpdatePack = true;
    },
    [updatePack.fulfilled]: (state, action) => {
      state.loadingUpdatePack = false;
      state.updatePackErrors = null;
      state.PackeditSuccess = true;
    },
    [updatePack.rejected]: (state, action) => {
      state.updatePackErrors = action.payload;
      state.loadingUpdatePack = false;
      state.PackeditSuccess = false;
    },
    [updatePackImage.pending]: (state) => {
      state.loadingUpdatePack = true;
    },
    [updatePackImage.fulfilled]: (state, action) => {
      state.loadingUpdatePack = false;
      state.updatePackErrors = null;
      state.PackImageEditSuccess = true;
    },
    [updatePackImage.rejected]: (state, action) => {
      state.updatePackErrors = action.payload;
      state.loadingUpdatePack = false;
      state.PackImageEditSuccess = false;
    },
  },
});

export default PackSlice.reducer;
export const { editPack ,clearPackErrors} = PackSlice.actions;