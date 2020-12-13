import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';
const reduxStore = configureStore({
    reducer: rootReducer,
});

export default reduxStore;
