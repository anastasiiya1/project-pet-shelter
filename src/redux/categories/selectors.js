import { createSelector } from "reselect";

const selectCategoriesState = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoriesState],
    (categoriesState) => categoriesState ? categoriesState.items : []  
);