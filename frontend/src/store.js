import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import dashboardReducer from "./redux/dashboardSlice";
import participationReducer from "./redux/participationSlice";
import roomReducer from "./redux/roomSlice";
import productReducer from "./redux/productSlice";
import categoryReducer from "./redux/categorySlice";
import brandReducer from "./redux/brandSlice";
import partnerReducer from "./redux/partnerSlice";
import orderReducer from "./redux/orderSlice";
import transactionReducer from "./redux/transactionSlice";
import packReducer from "./redux/packSlice";
import modalReducer from "./redux/modalSlice";
import packPurchase from "./redux/packPurchaseSlice";
import packUseSlice from "./redux/packUseSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    participation: participationReducer,
    room: roomReducer,
    product: productReducer,
    category: categoryReducer,
    brand: brandReducer,
    partner: partnerReducer,
    transaction: transactionReducer,
    order: orderReducer,
    pack: packReducer,
    modal: modalReducer,
    purchase: packPurchase,
    packUse: packUseSlice,
  },
});
export default store;
/* import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store */
