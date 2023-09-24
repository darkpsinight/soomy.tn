import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createParticipation = createAsyncThunk(
  "Transaction/createParticipation",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(
        "/participations/createParticipation",
        info,
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
export const createTransaction = createAsyncThunk(
  "Transaction/createTransaction",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("/participations/createTransaction", info, {
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
export const deleteTransaction = createAsyncThunk(
  "Transaction/deleteTransaction",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(
        `/participations/deletetransaction/${info}`,
        {
          withCredentials: true,
        }
      );
      dispatch(fetchTransactionList());
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
export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(
        `/participations/updatetransaction/${info.id}`,
        info.data,
        {
          withCredentials: true,
        }
      );
      dispatch(fetchTransactionList());
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
export const fetchTransactionList = createAsyncThunk(
  "transaction/fetchTransaction",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/participations/getTransactions/${info.page}`,
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

export const fetchAllTransactions = createAsyncThunk(
  "transaction/fetchTransaction",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/participations/getAllTransactions`, {
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
  "transaction/fetchUserParticipation",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/participations/getUserparticipation/${info.id}/${info.room}`,
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
export const getTransactionsbyId = createAsyncThunk(
  "transaction/fetchTransactionbyId",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `/participations/getTransactionsbyId`,
        info,
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
const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactionList: null,
    userTransactionList: null,
    createdTransaction: null,
    editedTransaction: { name: "", Description: "" },
    createTransactionsErrors: null,
    loadingcreateTransactions: null,
    loadingCreateTransaction: false,
    createTransactionErrors: null,
    loadingUpdateTransaction: false,
    updateTransactionErrors: null,
    loadingTransactionList: false,
    transactionListErrors: null,
    transactioneditSuccess: false,
    createParticipationErrors: null,
    loadingcreateParticipation: false,
    loadingUpdatePartipation: false,
    updateParticipationErrors: null,
    loadinguserTransaction: false,
    userTransactionErrors: null,
  },
  reducers: {
    editTransaction: (state, action) => {
      state.editedTransaction = action.payload;
    },
    clearTransactionErrors: (state) => {
      state.createTransactionErrors = null;
      state.transactionListErrors = null;
      state.createdTransaction = null;
      state.updateTransactionErrors = null;
      state.transactioneditSuccess = false;
    },
  },

  extraReducers: {
    [fetchTransactionList.pending]: (state) => {
      state.loadingTransactionList = true;
    },
    [fetchTransactionList.fulfilled]: (state, action) => {
      state.transactionList = action.payload;
      state.loadingTransactionList = false;
      state.transactionListErrors = null;
    },
    [fetchTransactionList.rejected]: (state, action) => {
      state.transactionListErrors = action.payload;
      state.loadingTransactionList = false;
    },
    [fetchAllTransactions.pending]: (state) => {
      state.loadingTransactionList = true;
    },
    [fetchAllTransactions.fulfilled]: (state, action) => {
      state.transactionList = action.payload;
      state.loadingTransactionList = false;
      state.transactionListErrors = null;
    },
    [fetchAllTransactions.rejected]: (state, action) => {
      state.transactionListErrors = action.payload;
      state.loadingTransactionList = false;
    },
    [getTransactionsbyId.pending]: (state) => {
      state.loadinguserTransaction = true;
    },
    [getTransactionsbyId.fulfilled]: (state, action) => {
      state.userTransactionList = action.payload;
      state.loadinguserTransaction = false;
      state.userTransactionErrors = null;
    },
    [getTransactionsbyId.rejected]: (state, action) => {
      state.userTransactionErrors = action.payload;
      state.loadinguserTransaction = false;
    },
    [deleteTransaction.pending]: (state) => {
      state.loadingTransactionList = true;
    },
    [deleteTransaction.fulfilled]: (state, action) => {
      state.loadingTransactionList = false;
      state.transactionListErrors = null;
    },
    [deleteTransaction.rejected]: (state, action) => {
      state.transactionListErrors = action.payload;
      state.loadingTransactionList = false;
    },
    [updateTransaction.pending]: (state) => {
      state.loadingUpdateTransaction = true;
    },
    [updateTransaction.fulfilled]: (state, action) => {
      state.loadingUpdateTransaction = false;
      state.updateTransactionErrors = null;
      state.transactioneditSuccess = true;
    },
    [updateTransaction.rejected]: (state, action) => {
      state.updateTransactionErrors = action.payload;
      state.loadingUpdateTransaction = false;
      state.transactioneditSuccess = false;
    },
    [createParticipation.pending]: (state) => {
      state.loadingcreateParticipation = true;
    },
    [createParticipation.fulfilled]: (state, action) => {
      state.loadingcreateParticipation = false;
      state.createParticipationErrors = null;
    },
    [createParticipation.rejected]: (state, action) => {
      state.createParticipationErrors = action.payload;
      state.loadingcreateParticipation = false;
    },
    [createTransaction.pending]: (state) => {
      state.loadingcreateTransactions = true;
    },
    [createTransaction.fulfilled]: (state, action) => {
      state.loadingcreateTransactions = false;
      state.createTransactionsErrors = null;
    },
    [createTransaction.rejected]: (state, action) => {
      state.createTransactionsErrors = action.payload;
      state.loadingcreateTransactions = false;
    },
  },
});

export default transactionSlice.reducer;
export const { editTransaction, clearTransactionErrors } =
  transactionSlice.actions;
