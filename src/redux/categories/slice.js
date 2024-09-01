import { createSlice } from '@reduxjs/toolkit';
import { getCategories, getCategoryById, updateCategory, deleteCategory } from './operations';

const initialState = {
    items: [],
    selectedCategory: null,
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
    name: 'categories',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, handlePending)
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(getCategories.rejected, handleReject)
            .addCase(getCategoryById.pending, handlePending)
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedCategory = action.payload;
            })
            .addCase(getCategoryById.rejected, handleReject)
            .addCase(updateCategory.pending, handlePending)
            .addCase(updateCategory.fulfilled, (action, state) => {
                state.isLoading = false;
                const index = state.items.findIndex((category) => category.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateCategory.rejected, handleReject)
            .addCase(deleteCategory.pending, handlePending)
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter(category => category.id !== action.payload);
            })
            .addCase(deleteCategory.rejected, handleReject);
    }
});

export const categoriesReducer = categorySlice.reducer;
