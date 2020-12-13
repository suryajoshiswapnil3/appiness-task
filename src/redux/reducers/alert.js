import { createReducer } from '@reduxjs/toolkit';
import { info, success, danger, clear } from '../actions/alert';

const initialState = { type: 'info', message: null };
const alertReducer = createReducer(initialState, {
    [info]: (state, action) => {
        state.type = 'info';
        state.message = action.payload;
    },
    [success]: (state, action) => {
        state.type = 'success';
        state.message = action.payload;
    },
    [danger]: (state, action) => {
        state.type = 'danger';
        state.message = action.payload;
    },
    [clear]: (state) => {
        state.type = 'info';
        state.message = null;
    },
});

export default alertReducer;
