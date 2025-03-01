import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { passwordsSlice } from "./passwords/passwordsSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        password: passwordsSlice.reducer
    }
});