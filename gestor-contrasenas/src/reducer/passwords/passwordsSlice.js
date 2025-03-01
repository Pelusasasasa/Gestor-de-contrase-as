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
        setPasswords: (state, {payload}) => {
            state.passwords = payload;
            state.passwordsIsSaving = false
        },
        addPassword: (state, {payload}) => {
            state.activePassword = payload;
            state.passwords.push( payload );
            state.passwordsIsSaving = false;
        }
    }
});


// Action creators are generated for each case reducer function
export const { addPassword, setPasswords, onSaving } = passwordsSlice.actions;