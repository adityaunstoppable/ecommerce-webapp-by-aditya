import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toasts',
  initialState: [],
  reducers: {
    addToast: (state, action) => {
      state.push(action.payload);
    },
    removeToast: (state, action) => {
      return state.filter(toast => toast.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export const selectToasts = (state) => state.toasts;

export default toastSlice.reducer;
