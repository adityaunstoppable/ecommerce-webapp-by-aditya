import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {},
  reducers: {
    addReview: (state, action) => {
      const { productId, review } = action.payload;
      state[productId] = review; 
    },
  },
});

export const selectReviewById = (state, productId) => state.reviews[productId];

export const { addReview } = reviewSlice.actions;

export default reviewSlice.reducer;
