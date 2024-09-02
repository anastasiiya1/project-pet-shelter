import { createSelector } from "reselect";

const selectCategoriesState = (state) => state.category;

export const selectCategories = createSelector(
    [selectCategoriesState],
    (categoriesState) => categoriesState ? categoriesState.categories : []  
);

export const selectIsLoading = (state) => state.category.isLoading;

export const selectError = (state) => state.category.error;

export const selectSelectedFilters = (state) => state.category.selectedFilters;

export const selectSelectedCategory = (state) => state.category.selectedCategory;