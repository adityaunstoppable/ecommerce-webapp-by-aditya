import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: {
        productsList: [],
        filteredProducts: [],
        loading: false
    },
    reducers: {
        setProducts(state, action) {
            state.productsList = action.payload;
            state.filteredProducts = action.payload;
            state.loading = false;
        },
        filterProductsByCategory(state, action) {
            const category = action.payload;
            if (category) {
                state.filteredProducts = state.productsList.filter(product => product.category === category.toLowerCase());
            } else {
                state.filteredProducts = state.productsList;
            }
        },
        setLoading(state, action) {
            state.loading = action.payload;
        }
    }
});

export const { setProducts, filterProductsByCategory, setLoading } = productsSlice.actions;

export default productsSlice.reducer;
