import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";
import postSlice from "./slices/PostsSlice";

export default configureStore({
    reducer: {
        authSlice,
        postSlice,
    }
})