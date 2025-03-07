import { createSlice } from '@reduxjs/toolkit';

export const passwordsSlice = createSlice({
    name: 'passwords',
    initialState: {
        activePassword: {},
        passwords: [],
        passwordsIsSaving: true
    },
    reducers: {
        onSaving: (state) => {
            state.passwordsIsSaving = true
        },
        setPasswords: (state, { payload }) => {
            state.passwords = payload;
            state.passwordsIsSaving = false
        },
        addPassword: (state, { payload }) => {
            state.activePassword = payload;
            state.passwords.push(payload);
            state.passwordsIsSaving = false;
        },
        resetPasswords: (state) => {
            state.passwords = [];
            state.activePassword = {};
            state.passwordsIsSaving = false
        },
        onDeleteAll: (state) => {
            state.passwords = [];
            state.passwordsIsSaving = false,
                state.activePassword = {};
        },
        onDeletePassword: (state, { payload }) => {
            state.passwords = state.passwords.filter(elem => elem._id !== payload);
            state.passwordsIsSaving = false
        },
        onPutPassowrd: (state, { payload }) => {
            state.passwords.map(elem => {
                if (elem._id === payload._id) {
                    elem = payload;
                }

                return elem;
            })

            state.passwordsIsSaving = false;
        }
    }
});


// Action creators are generated for each case reducer function
export const { addPassword, setPasswords, onDeleteAll, onDeletePassword, onPutPassowrd, onSaving, resetPasswords } = passwordsSlice.actions;