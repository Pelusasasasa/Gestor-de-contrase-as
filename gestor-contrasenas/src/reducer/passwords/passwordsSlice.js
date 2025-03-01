import { createSlice } from '@reduxjs/toolkit';

export const passwordsSlice = createSlice({
    name: 'passwords',
    initialState: {
        activePassword: {},
        passwords: [],
        passwordsIsSaving: false
    },
    reducers: {
        onSaving: (state) => {
            state.passwordsIsSaving = true
        },
    }
});


// Action creators are generated for each case reducer function
export const { onSaving } = passwordsSlice.actions;