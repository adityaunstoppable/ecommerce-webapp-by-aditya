import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        cartItems: [],
        cartCount: 0
    },
    reducers: {
        addProductToCart(state, action) {
            const existingProductIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

            if (existingProductIndex !== -1) {
                state.cartItems[existingProductIndex].count += 1; // Increment count
            } else {
                const newProduct = {
                    ...action.payload,
                    count: 1
                };
                state.cartItems.push(newProduct); // Add new product
            }

            state.cartCount = state.cartItems.length; // Update cart count
        },
        decreaseProductCount(state, action) {
            const existingProductIndex = state.cartItems.findIndex(item => item.id === action.payload);

            if (existingProductIndex !== -1) {
                const product = state.cartItems[existingProductIndex];

                if (product.count > 1) {
                    product.count -= 1; // Decrease count
                } else {
                    // If count reaches zero, remove the item from the cart
                    state.cartItems.splice(existingProductIndex, 1);
                }

                // Update cart count based on the number of items in the cart
                state.cartCount = state.cartItems.length;
            }
        },
        deleteProductFromCart(state, action) {
            // Completely remove the product
            const existingProductIndex = state.cartItems.findIndex(item => item.id === action.payload);
            if (existingProductIndex !== -1) {
                state.cartItems.splice(existingProductIndex, 1); // Remove the item from cart
            }
            state.cartCount = state.cartItems.length; // Ensure cart count matches the number of items
        },
        emptyCart(state) {
            state.cartItems = [];
            state.cartCount = 0;
        }
    }
});

export const { addProductToCart, decreaseProductCount, deleteProductFromCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
