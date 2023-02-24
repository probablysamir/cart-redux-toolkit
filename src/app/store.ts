import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartTotal/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
