import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createBrand = createAsyncThunk(
  "brand/createBrand",
  async (info, { rejectWithValue, dispatch }) => {
    const formData = new FormData();
    formData.append("image", info.file);
    formData.append("info", JSON.stringify(info.brandlist));
    try {
      const res = await axios.post("/brands/createbrand", formData, {
        withCredentials: true,
      });
      dispatch(fetchBrandList())
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
export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async (info, { rejectWithValue,dispatch }) => {
    try {
      const res = await axios.delete(`/brands/deletebrand/${info.id}`, {
        withCredentials: true,
      });
      dispatch(fetchBrandList({page: info?.page}))
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
export const fetchBrandList = createAsyncThunk(
  "brand/fetchBrand",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/brands/getBrands`,info, {
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
export const getTotalBrands = createAsyncThunk(
  "brand/getTotalBrands",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/brands/getTotalBrands`, {
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
export const updateBrand = createAsyncThunk(
  'brands/updateBrand',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/brands/updatebrand/${info.id}`, info.data, {
        withCredentials: true,
      });
      dispatch(fetchBrandList({page: info?.page}));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateBrandImage = createAsyncThunk(
  "brand/updateimagebrand",
  async (info, { rejectWithValue, dispatch }) => {
    const formData = new FormData();
    formData.append("image", info.file);
    try {
      const res = await axios.put(`/brands/updatebrandimage/${info.id}`, formData, {
        withCredentials: true,
      });
      dispatch(fetchBrandList({page: info?.page} ));
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

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: null,
    brandTotalList: null,
    createdBrand:null,
    loadingCreateBrand: false,
    loadingUpdateBrand: false,
    editedbrand:{ name:"",
    Description:"",
    },
    brandeditSuccess:false,
    brandImageEditSuccess:false,
    createBrandErrors: null,
    updateBrandErrors: null,
    loadingBrandList: false,
    brandListErrors: null,
  },
  reducers: {
    editbrand: (state,action) => {
      state.editedbrand=action.payload
    },
    clearbrandErrors: (state) => {
      state.createBrandErrors= null;
      state.brandListErrors = null;
      state.createdBrand = null;
      state.updateBrandErrors = null;
      state.brandeditSuccess = false ;
      state.brandImageEditSuccess = false ;
  }
  },

  extraReducers: {
    [createBrand.pending]: (state) => {
      state.loadingCreateBrand = true;
    },
    [createBrand.fulfilled]: (state, action) => {
      state.createdBrand = action.payload;
      state.loadingCreateBrand = false;
      state.createBrandErrors = null;
    },
    [createBrand.rejected]: (state, action) => {
      state.createBrandErrors = action.payload;
      state.loadingCreateBrand = false;
    },
    [fetchBrandList.pending]: (state) => {
      state.loadingBrandList = true;
    },
    [fetchBrandList.fulfilled]: (state, action) => {
      state.brands = action.payload;
      state.loadingBrandList = false;
      state.brandListErrors = null;
    },
    [fetchBrandList.rejected]: (state, action) => {
      state.brandListErrors = action.payload;
      state.loadingBrandList = false;},
    [getTotalBrands.pending]: (state) => {
      state.loadingBrandList = true;
    },
    [getTotalBrands.fulfilled]: (state, action) => {
      state.brands = action.payload;
      state.brandTotalList = action.payload;
      state.loadingBrandList = false;
      state.brandListErrors = null;
    },
    [getTotalBrands.rejected]: (state, action) => {
      state.brandListErrors = action.payload;
      state.loadingBrandList = false;},
    [deleteBrand.pending]: (state) => {
      state.loadingBrandList = true;
    },
    [deleteBrand.fulfilled]: (state, action) => {
      state.loadingBrandList = false;
      state.brandListErrors = null;
    },
    [deleteBrand.rejected]: (state, action) => {
      state.brandListErrors = action.payload;
      state.loadingBrandList = false;
    },
    [updateBrand.pending]: (state) => {
      state.loadingUpdateBrand = true;
    },
    [updateBrand.fulfilled]: (state, action) => {
      state.loadingUpdateBrand = false;
      state.updateBrandErrors = null;
      state.brandeditSuccess = true;
    },
    [updateBrand.rejected]: (state, action) => {
      state.updateBrandErrors = action.payload;
      state.loadingUpdateBrand = false;
      state.brandeditSuccess = false;
    },
    [updateBrandImage.pending]: (state) => {
      state.loadingUpdateBrand = true;
    },
    [updateBrandImage.fulfilled]: (state, action) => {
      state.loadingUpdateBrand = false;
      state.updateBrandErrors = null;
      state.brandImageEditSuccess = true;
    },
    [updateBrandImage.rejected]: (state, action) => {
      state.updateBrandErrors = action.payload;
      state.loadingUpdateBrand = false;
      state.brandImageEditSuccess = false;
    },
  },
});

export default brandSlice.reducer;
export const { editbrand ,clearbrandErrors} = brandSlice.actions;