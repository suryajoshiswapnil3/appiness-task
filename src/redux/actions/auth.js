import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../../utils/fake-api';

export const login = createAsyncThunk('login', (data) => {
    return post('/login', data);
});
export const logout = createAction('logout');
