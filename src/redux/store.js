import { configureStore } from "@reduxjs/toolkit";
import {CartSlice} from "./slices/CartSlice";
// this creates a centralized global store.
// a centralised store is collection of multiple slices and each 
// slice has its own reducer. containing multiple functions performing some actions.
export const store = configureStore({
    reducer:{
        cart: CartSlice.reducer,
    },
});