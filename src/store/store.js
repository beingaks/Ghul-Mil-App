import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";

export default configureStore({
    reducer: {
        authSlice,
    }
})