import { createReducer } from '@reduxjs/toolkit';
import { getUsers, addUser, removeUser } from '../actions/users';

const initialState = { isLoading: true, users: [] };
const usersReducer = createReducer(initialState, {
    [getUsers.pending]: (state) => {
        state.isLoading = true;
        state.users = [];
    },
    [getUsers.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
    },
    [getUsers.rejected]: (state) => {
        state.isLoading = false;
        state.users = [];
    },
    [addUser]: (state, action) => {
        state.users.push(action.payload);
    },
    [removeUser]: (state, action) => {
        state.users.splice(action.payload, 1);
    },
});

export default usersReducer;
