import { createSlice } from '@reduxjs/toolkit';
import { getCategories, getCategoryById, updateCategory, deleteCategory } from './operations';

const initialState = {
    categories: [],
    currentCategory: null,
    isLoading: false,
    error: null
};

const handlePending = (state) => {
    state.isLoading = true;
};

const handleReject = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, handlePending)
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(getCategories.rejected, handleReject)
            .addCase(getCategoryById.pending, handlePending)
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentCategory = action.payload;
            })
            .addCase(getCategoryById.rejected, handleReject)
            .addCase(updateCategory.pending, handlePending)
            .addCase(updateCategory.fulfilled, (action, state) => {
                state.isLoading = false;
                state.categories = state.categories.map((category) =>
                    category.id === action.payload.id ? action.payload : category
                );
                state.currentCategory = action.payload;
            })
            .addCase(updateCategory.rejected, handleReject)
            .addCase(deleteCategory.pending, handlePending)
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = state.categories.filter((category) => category.id !== action.payload);
                state.currentCategory = null;
            })
            .addCase(deleteCategory.rejected, handleReject);
    }
});

export const categoriesReducer = categorySlice.reducer;
