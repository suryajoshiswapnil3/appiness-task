import { createAction } from '@reduxjs/toolkit';

export const info = createAction('showInfoAlert');
export const success = createAction('setSuccessAlert');
export const danger = createAction('setDangerAlert');
export const clear = createAction('clear');
