import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'user',
    initialState: {
        status: 'not-authenticated',
        user: {},
        errorMessage: undefined
    },
    reducers: {
        clearErrorMessage: (state) => {
            state.errorMessage = undefined
        },
        onChecking: (state) => {
            state.status = 'checking';
        },
        onLogin: (state, { payload }) => {
            state.user = payload,
                state.status = 'authenticated'
        },
        onLogOut: (state, { payload }) => {
            state.user = {},
                state.status = 'not-authenticated',
                state.errorMessage = payload
        },
        onAddUser: (state, { payload }) => {
            state.user = payload,
                state.status = 'authenticated'
        }
    }
});


// Action creators are generated for each case reducer function
export const { clearErrorMessage, onAddUser, onChecking, onLogin, onLogOut } = authSlice.actions;