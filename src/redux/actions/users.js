import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../../utils/fake-api';

export const getUsers = createAsyncThunk('getUsers', () => {
    return get('/users');
});
export const removeUser = createAction('removeUser');
export const addUser = createAction('addUser');
