import { combineReducers } from '@reduxjs/toolkit';

import alertReducer from './alert';
import authReducer from './auth';
import usersReducer from './users';

const rootReducer = combineReducers({
    alert: alertReducer,
    auth: authReducer,
    users: usersReducer,
});

export default rootReducer;
