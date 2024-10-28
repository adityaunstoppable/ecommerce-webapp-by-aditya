import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
    name:'categoriesSlice',
    initialState:{
        categoriesList:[],
        selectedCategory: ""
    },
    reducers:{
        addAllCategories(state,action) {
            state.categoriesList = action.payload
        },
        setCategory(state, action){
            state.selectedCategory = action.payload
        }
    }
});

export const {addAllCategories, setCategory} = categoriesSlice.actions;

export default categoriesSlice.reducer;