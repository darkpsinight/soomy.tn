import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (info, { rejectWithValue, dispatch }) => {
  
    try {
      const res = await axios.post("/categories/createcategory",info, {
        withCredentials: true,
      });
      dispatch(fetchCategoryList({page:info.page}));
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
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (info, { rejectWithValue,dispatch }) => {
    try {
      const res = await axios.delete(`/categories/deletecategory/${info.id}`, {
        withCredentials: true,
      });
      dispatch(fetchCategoryList({page:info.page}));
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
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/categories/updatecategory/${info.id}`, info.data, {
        withCredentials: true,
      });
      dispatch(fetchCategoryList({page:info.page}));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const fetchCategoryList = createAsyncThunk(
  "category/fetchcategory",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/categories/listcategories`,info, {
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
export const getTotalCategories = createAsyncThunk(
  "category/getTotalCategories",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/categories/listTotalcategories`, {
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
export const getCategoryByName = createAsyncThunk(
  "category/getCategoryByName",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/categories/getCategoryByName/${info}`, {
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
const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryList: null,
    totalCategoryList:null,
    createdCategory:null,
    editedcategory:{ name:"",
    Description:"",
    },
    loadingCreateCategory: false,
    createCategoryErrors: null,
    loadingUpdateCategory: false,
    updateCategoryErrors: null,
    loadingCategoryList: false,
    categoryListErrors: null,
    categoryeditSuccess:false,
   categoryName : null,
     loadingCategoryName : false,
     categoryNameErrors : null,
  },
  reducers: {
    editcategory: (state,action) => {
      state.editedcategory=action.payload
    
    },
    clearcategoryErrors: (state) => {
      state.createCategoryErrors= null;
      state.categoryListErrors = null;
      state.createdCategory = null;
      state.updateCategoryErrors = null;
      state.categoryeditSuccess = false
  }
  },

  extraReducers: {
    [createCategory.pending]: (state) => {
      state.loadingCreateCategory = true;
    },
    [createCategory.fulfilled]: (state, action) => {
      state.createdCategory = action.payload;
      state.loadingCreateCategory = false;
      state.createCategoryErrors = null;
    },
    [createCategory.rejected]: (state, action) => {
      state.createCategoryErrors = action.payload;
      state.loadingCreateCategory = false;
    },
    [fetchCategoryList.pending]: (state) => {
      state.loadingCategoryList = true;
    },
    [fetchCategoryList.fulfilled]: (state, action) => {
      state.categoryList = action.payload;
      state.loadingCategoryList = false;
      state.categoryListErrors = null;
    },
    [getTotalCategories.pending]: (state) => {
      state.loadingCategoryList = true;
    },
    [getTotalCategories.fulfilled]: (state, action) => {
      state.categoryList = action.payload;
      state.totalCategoryList = action.payload;
      state.loadingCategoryList = false;
      state.categoryListErrors = null;
    },
    [getTotalCategories.rejected]: (state, action) => {
      state.categoryListErrors = action.payload;
      state.loadingCategoryList = false;
    },
    [getCategoryByName.pending]: (state) => {
      state.loadingCategoryName = true;
    },
    [getCategoryByName.fulfilled]: (state, action) => {
      state.categoryName = action.payload;
      state.loadingCategoryName = false;
      state.categoryNameErrors = null;
    },
    [getCategoryByName.rejected]: (state, action) => {
      state.categoryNameErrors = action.payload;
      state.loadingCategoryName = false;
    },
    [deleteCategory.pending]: (state) => {
      state.loadingCategoryList = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.loadingCategoryList = false;
      state.categoryListErrors = null;
    },
    [deleteCategory.rejected]: (state, action) => {
      state.categoryListErrors = action.payload;
      state.loadingCategoryList = false;
    },
    [updateCategory.pending]: (state) => {
      state.loadingUpdateCategory = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.loadingUpdateCategory = false;
      state.updateCategoryErrors = null;
      state.categoryeditSuccess = true;
    },
    [updateCategory.rejected]: (state, action) => {
      state.updateCategoryErrors = action.payload;
      state.loadingUpdateCategory = false;
      state.categoryeditSuccess = false
    },
  },
});

export default categorySlice.reducer;
export const { editcategory , clearcategoryErrors} = categorySlice.actions;