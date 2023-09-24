import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "Order/createOrder",
  async (info, { rejectWithValue, dispatch }) => {
  
    try {
      const res = await axios.post("/orders/createOrder",info, {
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
export const validationMail = createAsyncThunk(
  "Order/validationMail",
  async (info, { rejectWithValue, dispatch }) => {
  
    try {
      const res = await axios.post("/orders/validationMail",info, {
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
export const deleteOrder = createAsyncThunk(
  "Order/deleteOrder",
  async (info, { rejectWithValue,dispatch }) => {
    try {
      const res = await axios.delete(`/orders/deleteOrder/${info}`, {
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

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/orders/updateOrder/${info.id}`, info.data, {
        withCredentials: true,
      });
    
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const fetchOrderList = createAsyncThunk(
  "Order/fetchOrder",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/orders/listOrders/${info.page}`, {
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
export const getNumberOfOrders = createAsyncThunk(
  "Order/fetchNumber",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/orders/getNumberOfOrders`, {
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
export const getsingleOrder = createAsyncThunk(
  "Order/getsingleOrder",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/orders/getsingleOrder/${info}`, {
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
export const getOrderByRoom = createAsyncThunk(
  "Order/getOrderByRoom",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/orders/getOrderByRoom/${info.room}/${info.user}`, {
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
export const getUserOrder = createAsyncThunk(
  "Order/getUserOrder",
  async (info, { rejectWithValue }) => {
    try {
      
      const res = await axios.get(`/orders/getUserOrder/${info.id}/${info.page}`, {
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

export const getAllOrders = createAsyncThunk(
  "Order/getAllOrders",
  async ( rejectWithValue ) => {
    try {
      
      const res = await axios.get(`/orders/getAllOrders`, {
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

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderList: null,
    userOrder:null,
    singleOrder:null,
    NumberOfOrders:null,
    createdOrder:null,
    editedOrder:{ name:"",
    Description:"",
    },
    loadingCreateOrder: false,
    createOrderErrors: null,
    loadingUpdateOrder: false,
    updateOrderErrors: null,
    loadingorderList: false,
    orderListErrors: null,
    OrdereditSuccess:false
  },
  reducers: {
    editOrder: (state,action) => {
      state.editedOrder=action.payload
    
    },
    clearOrderErrors: (state) => {
      state.createOrderErrors= null;
      state.orderListErrors = null;
      state.createdOrder = null;
      state.updateOrderErrors = null;
      state.OrdereditSuccess = false
  }
  },

  extraReducers: {
    [createOrder.pending]: (state) => {
      state.loadingCreateOrder = true;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.createdOrder = action.payload;
      state.loadingCreateOrder = false;
      state.createOrderErrors = null;
    },
    [createOrder.rejected]: (state, action) => {
      state.createOrderErrors = action.payload;
      state.loadingCreateOrder = false;
    },
    [fetchOrderList.pending]: (state) => {
      state.loadingorderList = true;
    },
    [fetchOrderList.fulfilled]: (state, action) => {
      state.orderList = action.payload;
      state.loadingorderList = false;
      state.orderListErrors = null;
    },
    [fetchOrderList.rejected]: (state, action) => {
      state.orderListErrors = action.payload;
      state.loadingorderList = false;
    },
    [getNumberOfOrders.pending]: (state) => {
      state.loadingNumberOfOrders = true;
    },
    [getNumberOfOrders.fulfilled]: (state, action) => {
      state.NumberOfOrders = action.payload;
      state.loadingNumberOfOrders = false;
      state.NumberOfOrdersErrors = null;
    },
    [getNumberOfOrders.rejected]: (state, action) => {
      state.NumberOfOrdersErrors = action.payload;
      state.loadingNumberOfOrders = false;
    },
    [ validationMail.pending]: (state) => {
      state.loadingUpdateOrder = true;
    },
    [ validationMail.fulfilled]: (state, action) => {
      state.updateOrderErrors = null;
      state.loadingUpdateOrder = false;
    },
    [ validationMail.rejected]: (state, action) => {
      state.updateOrderErrors = action.payload;
      state.loadingUpdateOrder = false;
    },
    [getsingleOrder.pending]: (state) => {
      state.loadingsingleOrder = true;
    },
    [getsingleOrder.fulfilled]: (state, action) => {
      state.singleOrder = action.payload;
      state.loadingsingleOrder = false;
      state.singleOrderErrors = null;
    },
    [getsingleOrder.rejected]: (state, action) => {
      state.singleOrderErrors = action.payload;
      state.loadingsingleOrder = false;
    },
    [getOrderByRoom.pending]: (state) => {
      state.loadingsingleOrder = true;
    },
    [getOrderByRoom.fulfilled]: (state, action) => {
      state.singleOrder = action.payload;
      state.loadingsingleOrder = false;
      state.singleOrderErrors = null;
    },
    [getOrderByRoom.rejected]: (state, action) => {
      state.singleOrderErrors = action.payload;
      state.loadingsingleOrder = false;
    },
    [getUserOrder.pending]: (state) => {
      state.loadingUserOrder = true;
    },
    [getUserOrder.fulfilled]: (state, action) => {
      state.userOrder = action.payload;
      state.loadingUserOrder = false;
      state.UserOrderErrors = null;
    },
    [getUserOrder.rejected]: (state, action) => {
      state.userOrderErrors = action.payload;
      state.loadingUserOrder = false;
    },
    [deleteOrder.pending]: (state) => {
      state.loadingorderList = true;
    },
    [deleteOrder.fulfilled]: (state, action) => {
      state.loadingorderList = false;
      state.orderListErrors = null;
    },
    [deleteOrder.rejected]: (state, action) => {
      state.orderListErrors = action.payload;
      state.loadingorderList = false;
    },
    [updateOrder.pending]: (state) => {
      state.loadingUpdateOrder = true;
    },
    [updateOrder.fulfilled]: (state, action) => {
      state.loadingUpdateOrder = false;
      state.updateOrderErrors = null;
      state.OrdereditSuccess = true;
    },
    [updateOrder.rejected]: (state, action) => {
      state.updateOrderErrors = action.payload;
      state.loadingUpdateOrder = false;
      state.OrdereditSuccess = false
    },
    [getAllOrders.pending]: (state) => {
      state.loadingOrderList = true;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.orderList.orders = action.payload;
      state.loadingOrderList = false;
      state.orderListErrors = null;
    },
    [getAllOrders.rejected]: (state, action) => {
      state.loadingOrderList = false;
      state.orderListErrors = action.payload;
    },
  },
});

export default orderSlice.reducer;
export const { editOrder , clearOrderErrors} = orderSlice.actions;