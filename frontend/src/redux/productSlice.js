import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (info, { rejectWithValue, dispatch }) => {
    const formData = new FormData();
    formData.append("image", info.file);
    formData.append("image", info.file1);
    formData.append("image", info.file2);
    formData.append("image", info.file3);
    formData.append("info", JSON.stringify(info.productInput));
    try {
      const res = await axios.post("/products/createproduct", formData,{ withCredentials: true });
      dispatch(getProductPagination({page:info.page}))
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
export const fetchProductList = createAsyncThunk(
  "product/fetchProductList",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/products/getTotalProducts`, {
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
export const getProductPagination = createAsyncThunk(
  "product/getProductPagination",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/products/getProductPagination`,info,{
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
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/products/product/${info}`, {
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
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (info, { rejectWithValue,dispatch }) => {
    try {
      const res = await axios.delete(`/products/deleteproduct/${info.id}`, {
        withCredentials: true,
      });
      dispatch(getProductPagination({ page: info.page }))
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
export const updateProduct = createAsyncThunk(
  'products/updateProducts',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/products/updateproduct/${info.id}`, info.data, {
        withCredentials: true,
      });
      dispatch(getProductPagination({page:info.page}));
      return res.data;
    } catch (error) {
        return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );;
    }
  }
);
export const updateProductImage = createAsyncThunk(
  "product/updateimageproduct",
  async (info, { rejectWithValue, dispatch }) => {
    
    const formData = new FormData();
    formData.append("image", info.file);

    try {
      const res = await axios.put(`/products/updateproductimage/${info.id}`, formData, {
        withCredentials: true,
      });
     dispatch(getProductPagination({page:info.page}))
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
export const updateProductImage1 = createAsyncThunk(
  "product/updateimageproduct1",
  async (info, { rejectWithValue, dispatch }) => {
    
    const formData = new FormData();
    formData.append("image", info.file);
    try {
      const res = await axios.put(`/products/updateproductimage1/${info.id}`, formData, {
        withCredentials: true,
      });
     dispatch(getProductPagination({page:info.page}))
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
export const updateProductImage2 = createAsyncThunk(
  "product/updateimageproduct2",
  async (info, { rejectWithValue, dispatch }) => {
    
    const formData = new FormData();
    formData.append("image", info.file);
    try {
      const res = await axios.put(`/products/updateproductimage2/${info.id}`, formData, {
        withCredentials: true,
      });
     dispatch(getProductPagination({page:info.page}))
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
const productSlice = createSlice({
  name: "product",
  initialState: {
    paginateProduct:null,
    products: null,
    product:null,
    createdProduct:null,
    editedproduct:{
      title:"",
      subTitle:"",
    description:"",
    prix:"",
    prixPromo:"",
    garantie:"",
    partner:"",
    brand:"",
    category:"",
    image:"",
    image1:"",
    image2:""
    },
    loadingFetchProduct: false,
    fetchProductErrors: null,
    loadingCreateProduct: false,
    createProductErrors: null,
    loadingProductList: false,
    updateProductErrors: null,
    loadingUpdateProduct: false,
    ProductListErrors: null,
    producteditSuccess:false,
    productImageEditSuccess:false,
  },
  reducers: {
    editproduct: (state,action) => {
      state.editedproduct=action.payload
    
    },
    clearProductErrors: (state) => {
      state.createProductErrors = null;
      state.ProductListErrors = null;
      state.createdProduct = null;
      state.updateProductErrors = null;
      state.producteditSuccess = false
      state.productImageEditSuccess = false
    
      
    },
  },

  extraReducers: {
    [createProduct.pending]: (state) => {
      state.loadingCreateProduct = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.createdProduct = action.payload;
      state.loadingCreateProduct = false;
      state.createProductErrors = null;
    },
    [createProduct.rejected]: (state, action) => {
      state.createProductErrors = action.payload;
      state.loadingCreateProduct = false;
    },
    [fetchProductList.pending]: (state) => {
      state.loadingProductList = true;
    },
    [fetchProductList.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.paginateProduct = action.payload;
      state.loadingProductList = false;
      state.ProductListErrors = null;
    },
    [fetchProductList.rejected]: (state, action) => {
      state.ProductListErrors = action.payload;
      state.loadingProductList = false;
    },
    [getProductPagination.pending]: (state) => {
      state.loadingProductList = true;
    },
    [getProductPagination.fulfilled]: (state, action) => {
      state.paginateProduct = action.payload;
      state.loadingProductList = false;
      state.ProductListErrors = null;
    },
    [getProductPagination.rejected]: (state, action) => {
      state.ProductListErrors = action.payload;
      state.loadingProductList = false;
    },
    [fetchProduct.pending]: (state) => {
      state.loadingFetchProduct= false;
      
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.loadingFetchProduct= false;
      state.fetchProductErrors= null;
    },
    [fetchProduct.rejected]: (state, action) => {
      state.loadingFetchProduct= false;
      state.fetchProductErrors= action.payload;
    },
    [deleteProduct.pending]: (state) => {
      state.loadingProductList = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loadingProductList = false;
      state.ProductListErrors = null;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.ProductListErrors = action.payload;
      state.loadingProductList = false;
    },
    [updateProduct.pending]: (state) => {
      state.loadingUpdateProduct = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loadingUpdateProduct = false;
      state.updateProductErrors = null;
      state.producteditSuccess = true;
    },
    [updateProduct.rejected]: (state, action) => {
      state.updateProductErrors = action.payload;
      state.loadingUpdateProduct = false;
      state.producteditSuccess = false;
    },
    [updateProductImage.pending]: (state) => {
      state.loadingUpdateProduct = true;
    },
    [updateProductImage.fulfilled]: (state, action) => {
      state.loadingUpdateProduct = false;
      state.updateProductErrors = null;
      state.productImageEditSuccess = true;
    },
    [updateProductImage.rejected]: (state, action) => {
      state.updateProductErrors = action.payload;
      state.loadingUpdateProduct = false;
      state.productImageEditSuccess = false;
    },
    [updateProductImage1.pending]: (state) => {
      state.loadingUpdateProduct = true;
    },
    [updateProductImage1.fulfilled]: (state, action) => {
      state.loadingUpdateProduct = false;
      state.updateProductErrors = null;
      state.productImageEditSuccess = true;
    },
    [updateProductImage1.rejected]: (state, action) => {
      state.updateProductErrors = action.payload;
      state.loadingUpdateProduct = false;
      state.productImageEditSuccess = false;
    },
    [updateProductImage2.pending]: (state) => {
      state.loadingUpdateProduct = true;
    },
    [updateProductImage2.fulfilled]: (state, action) => {
      state.loadingUpdateProduct = false;
      state.updateProductErrors = null;
      state.productImageEditSuccess = true;
    },
    [updateProductImage2.rejected]: (state, action) => {
      state.updateProductErrors = action.payload;
      state.loadingUpdateProduct = false;
      state.productImageEditSuccess = false;
    },
  },
});

export default productSlice.reducer;
export const { editproduct ,clearProductErrors} = productSlice.actions;