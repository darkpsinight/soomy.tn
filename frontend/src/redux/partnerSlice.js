import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createPartner = createAsyncThunk(
  "partner/createPartner",
  async (info, { rejectWithValue, dispatch }) => {
    const formData = new FormData();
    formData.append("image", info.file);
    formData.append("info", JSON.stringify(info.partnerlist));
    try {
      const res = await axios.post("/partners/createpartner", formData, {
        withCredentials: true,
      });
      dispatch(fetchPartnerList())
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

export const fetchPartnerList = createAsyncThunk(
  "partner/fetchPartner",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/partners/getPartners`,info, {
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
export const getTotalPartners= createAsyncThunk(
  "partner/getTotalPartners",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/partners/getTotalPartners`, {
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
export const deletePartner = createAsyncThunk(
    "partner/deletePartner",
    async (info, { rejectWithValue,dispatch }) => {
      try {
        const res = await axios.delete(`/partners/deletepartner/${info.id}`, {
        withCredentials: true,
      });
        dispatch(fetchPartnerList({page:info.page}))
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
  export const updatePartner = createAsyncThunk(
    'partners/updatePartners',
    async (info, { rejectWithValue, dispatch }) => {
      try {
        const res = await axios.put(`/partners/updatepartner/${info.id}`, info.data, {
          withCredentials: true,
        });
        dispatch(fetchPartnerList({page:info.page}))
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
  export const updatePartnerImage = createAsyncThunk(
    "partner/updateimagepartner",
    async (info, { rejectWithValue, dispatch }) => {
      
      const formData = new FormData();
      formData.append("image", info.file);
      try {
        const res = await axios.put(`/partners/updatepartnerimage/${info.id}`, formData, {
        withCredentials: true,
      });
        dispatch(fetchPartnerList({page:info.page}))
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
const PartnerSlice = createSlice({
  name: "partner",
  initialState: {
    partners: null,
    partnerTotalList: null,
    createdPartner:null,
    editedpartner:{ name:"",
      adresse:"",
     phone:"",
     email:""},
    loadingCreatePartner: false,
    createPartnerErrors: null,
    loadingUpdatePartner: false,
    updatePartnerErrors: null,
    loadingPartnerList: false,
    PartnerListErrors: null,
    partnereditSuccess: false,
    partnerImageEditSuccess : false
  },
  reducers: {
    editpartner: (state,action) => {
        state.editedpartner=action.payload
    },
    clearpartnerErrors: (state) => {
        state.createPartnerErrors= null;
        state.PartnerListErrors = null;
        state.createdPartner = null;
        state.updatePartnerErrors = null;
        state.partnereditSuccess = false
        state.partnerImageEditSuccess = false
    }
  },

  extraReducers: {
    [createPartner.pending]: (state) => {
      state.loadingCreatePartner = true;
    },
    [createPartner.fulfilled]: (state, action) => {
      state.createdPartner = action.payload;
      state.loadingCreatePartner = false;
      state.createPartnerErrors = null;
    },
    [createPartner.rejected]: (state, action) => {
      state.createPartnerErrors = action.payload;
      state.loadingCreatePartner = false;
    },
    [fetchPartnerList.pending]: (state) => {
      state.loadingPartnerList = true;
    },
    [fetchPartnerList.fulfilled]: (state, action) => {
      state.partners = action.payload;
      state.loadingPartnerList = false;
      state.PartnerListErrors = null;
    },
    [fetchPartnerList.rejected]: (state, action) => {
      state.PartnerListErrors = action.payload;
      state.loadingPartnerList = false;
    },
    [getTotalPartners.pending]: (state) => {
      state.loadingPartnerList = true;
    },
    [getTotalPartners.fulfilled]: (state, action) => {
      state.partners = action.payload;
      state.partnerTotalList = action.payload;
      state.loadingPartnerList = false;
      state.PartnerListErrors = null;
    },
    [getTotalPartners.rejected]: (state, action) => {
      state.PartnerListErrors = action.payload;
      state.loadingPartnerList = false;
    },
    [deletePartner.pending]: (state) => {
      state.loadingPartnerList = true;
    },
    [deletePartner.fulfilled]: (state, action) => {
      state.loadingPartnerList = false;
      state.PartnerListErrors = null;
    },
    [deletePartner.rejected]: (state, action) => {
      state.PartnerListErrors = action.payload;
      state.loadingPartnerList = false;
    },
    [updatePartner.pending]: (state) => {
      state.loadingUpdatePartner = true;
    },
    [updatePartner.fulfilled]: (state, action) => {
      state.loadingUpdatePartner = false;
      state.updatePartnerErrors = null;
      state.partnereditSuccess = true;
    },
    [updatePartner.rejected]: (state, action) => {
      state.updatePartnerErrors = action.payload;
      state.loadingUpdatePartner = false;
      state.partnereditSuccess = false;
    },
    [updatePartnerImage.pending]: (state) => {
      state.loadingUpdatePartner = true;
    },
    [updatePartnerImage.fulfilled]: (state, action) => {
      state.loadingUpdatePartner = false;
      state.updatePartnerErrors = null;
      state.partnerImageEditSuccess= true;
    },
    [updatePartnerImage.rejected]: (state, action) => {
      state.updatePartnerErrors = action.payload;
      state.loadingUpdatePartner = false;
      state.partnerImageEditSuccess = false;
    },
  },
});

export default PartnerSlice.reducer;
export const { editpartner, clearpartnerErrors} = PartnerSlice.actions;