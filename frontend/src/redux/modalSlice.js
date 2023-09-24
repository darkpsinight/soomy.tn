import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    brandToggle: false,
    packToggle: false,
    roomToggle: false,
    partnerToggle: false,
    categoryToggle: false,
    productToggle: false,
    orderToggle: false,
    brandToggleUpdate: false,
    roomToggleUpdate: false,
    partnerToggleUpdate: false,
    categoryToggleUpdate: false,
    productToggleUpdate: false,
    orderToggleUpdate: false,
    packToggleUpdate: false,
  },
  reducers: {
    setBrandToggle: (state, action) => {
      state.brandToggle = action.payload;
    },
    setPackToggle: (state, action) => {
      state.packToggle = action.payload;
    },
    setRoomToggle: (state, action) => {
      state.roomToggle = action.payload;
    },
    setPartnerToggle: (state, action) => {
      state.partnerToggle = action.payload;
    },
    setCategoryToggle: (state, action) => {
      state.categoryToggle = action.payload;
    },
    setProductToggle: (state, action) => {
      state.productToggle = action.payload;
    },
    setOrderToggle: (state, action) => {
      state.orderToggle = action.payload;
    },
    setBrandToggleUpdate: (state, action) => {
      state.brandToggleUpdate = action.payload;
    },
    setRoomToggleUpdate: (state, action) => {
      state.roomToggleUpdate = action.payload;
    },
    setPartnerToggleUpdate: (state, action) => {
      state.partnerToggleUpdate = action.payload;
    },
    setCategoryToggleUpdate: (state, action) => {
      state.categoryToggleUpdate = action.payload;
    },
    setProductToggleUpdate: (state, action) => {
      state.productToggleUpdate = action.payload;
    },
    setOrderToggleUpdate: (state, action) => {
      state.orderToggleUpdate = action.payload;
    },
    setPackToggleUpdate: (state, action) => {
      state.packToggleUpdate = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const {
  setBrandToggle,
  setRoomToggle,
  setPackToggle,
  setPartnerToggle,
  setCategoryToggle,
  setProductToggle,
  setOrderToggle,
  setBrandToggleUpdate,
  setRoomToggleUpdate,
  setPartnerToggleUpdate,
  setCategoryToggleUpdate,
  setProductToggleUpdate,
  setOrderToggleUpdate,
  setPackToggleUpdate,
} = modalSlice.actions;
