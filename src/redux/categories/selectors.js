export const selectAllCategories = (state) => state.category?.categories || [];
export const selectCategoryLoading = (state) => state.category?.isLoading || false;
export const selectCategoryError = (state) => state.category?.error || null;
export const selectCurrentCategory = (state) => state.category?.currentCategory || null;
