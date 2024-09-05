// import { createSlice } from '@reduxjs/toolkit';
// import { getCategories, getCategoryById, updateCategory, deleteCategory } from './operations';

// const initialState = {
//     categories: [],
//     selectedFilters: [],
//     selectedCategory: null,
//     isLoading: false,
//     error: null
// };

// const handlePending = (state) => {
//     state.isLoading = true;
// };

// const handleReject = (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
// };

// const categorySlice = createSlice({
//     name: 'category',
//     initialState,
//     reducers: {
//         toggleFilter: (state, action) => {
//             const categoryId = action.payload;
//             const index = state.selectedFilters.indexOf(categoryId);
//             if(index === -1){
//                 state.selectedFilters.push(categoryId);
//             }else{
//                 state.selectedFilters.splice(index, 1);
//             }
//         },
//         clearFilters: (state) => {
//             state.selectedFilters = [];
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getCategories.pending, handlePending)
//             .addCase(getCategories.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 // console.log('Categories fulfilled:', action.payload);
//                 state.categories = action.payload;
//             })
//             .addCase(getCategories.rejected, handleReject)
//             .addCase(getCategoryById.pending, handlePending)
//             .addCase(getCategoryById.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 // console.log('Selected category fulfilled:', action.payload);
//                 state.selectedCategory = action.payload;
//             })
//             .addCase(getCategoryById.rejected, handleReject)
//             .addCase(updateCategory.pending, handlePending)
//             .addCase(updateCategory.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 const index = state.categories.findIndex((category) => category.id === action.payload.id);
//                 if (index !== -1) {
//                     state.categories[index] = action.payload;
//                 }
//             })
//             .addCase(updateCategory.rejected, handleReject)
//             .addCase(deleteCategory.pending, handlePending)
//             .addCase(deleteCategory.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.categories = state.categories.filter(category => category.id !== action.payload);
//             })
//             .addCase(deleteCategory.rejected, handleReject);
//     }
// });

// export const {toggleFilter, clearFilters} = categorySlice.actions;

// export const categoriesReducer = categorySlice.reducer;
