import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const url = "https://course-api.com/react-useReducer-cart-project";

interface Item {
  id: string;
  title: string;
  img: string;
  price: string;
  amount: number;
}

interface InitialState {
  items: Item[];
  totalAmount: number;
  totalPrice: number;
  isLoading: boolean;
  error: string;
}

const initialState: InitialState = {
  items: [],
  totalAmount: 0,
  totalPrice: 0,
  isLoading: false,
  error: "",
};

export const getItems = createAsyncThunk("cart/getItems", () => {
  return axios.get(url).then((response) => response.data);
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      index !== -1 && state.items.splice(index, 1);
      toast.success("Item removed succesfully")
    },
    increaseItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      index !== -1 && state.items[index].amount++;
    },
    decreaseItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      index !== -1 && state.items[index].amount--;
    },
    totalItem: (state) => {
      state.totalAmount = state.items.reduce((sum, item) => sum + item.amount, 0);
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + parseFloat(item.price) * item.amount,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      toast.success("Cart cleared succesfully");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.error = "";
      state.isLoading = false;
    });
    builder.addCase(getItems.rejected, (state, action) => {
      state.items = [];
      state.error = action.error.message || "Sorry something went wrong";
      state.isLoading = true;
    });
  },
});

export default cartSlice.reducer;
export const { removeItem, increaseItem, decreaseItem, totalItem, clearCart } = cartSlice.actions;
export const selectIsLoading = (state: any) => state.cart.isLoading;
