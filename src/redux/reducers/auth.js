import { createReducer } from '@reduxjs/toolkit';
import { login, logout } from '../actions/auth';

const initialState = { isLoading: false, user: null };
const authReducers = createReducer(initialState, {
    [login.pending]: (state) => {
        state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
    },
    [login.rejected]: (state) => {
        state.isLoading = false;
        state.user = null;
    },
    [logout]: (state) => {
        state.isLoading = false;
        state.user = null;
    },
});

export default authReducers;
