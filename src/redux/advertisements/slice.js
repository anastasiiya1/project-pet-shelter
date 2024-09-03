import { createSlice } from '@reduxjs/toolkit';
import { fetchAdvertisements, addNewAdvertisement, deleteAdvertisement } from './operations';

const advertisementSlice = createSlice({
    name: 'advertisements',
    initialState: {
        items: [],
        filteredItems: [],
        searchQuery: {
            categoryId: '',
            breed: '',
            age: '',
            size: '',
            gender: '',
            color: '',
            furLength: '',
            priceRange: { min: '', max: '' }
        },
        isLoading: false,
        error: null
    },
    reducers: {
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
            const { categoryId, breed, age, size, gender, color, furLength, priceRange } = action.payload;
            const minPrice = priceRange.min || '';
            const maxPrice = priceRange.max || '';
    
            state.filteredItems = state.items.filter((advert) => {
                const matchesCategory = !categoryId || advert.categoryId === categoryId;
                const matchesBreed = !breed || advert.breed === breed;
                const matchesAge = !age || advert.age === age;
                const matchesSize = !size || advert.size === size;
                const matchesGender = !gender || advert.gender === gender;
                const matchesColor = !color || advert.color === color;
                const matchesFurLength = !furLength || advert.furLength === furLength;
                const matchesPriceRange =
                    (!minPrice || advert.price >= minPrice) && (!maxPrice || advert.price <= maxPrice);
    
                return matchesCategory && matchesBreed && matchesAge && matchesSize && matchesGender && matchesColor && matchesFurLength && matchesPriceRange;
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdvertisements.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAdvertisements.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
                state.filteredItems = state.items.filter((advert) => advert.title.includes(state.searchQuery.title));
            })
            .addCase(fetchAdvertisements.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch advertisements';
            })
            .addCase(addNewAdvertisement.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addNewAdvertisement.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
                state.filteredItems = state.items.filter((advert) =>
                    advert.title.toLowerCase().includes(state.searchQuery.title.toLowerCase())
                );
            })
            .addCase(addNewAdvertisement.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to add new advertisement';
            })
            .addCase(deleteAdvertisement.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteAdvertisement.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter((advert) => advert.id !== action.payload);
                state.filteredItems = state.items.filter((advert) =>
                    advert.title.includes(state.searchQuery.title)
                );
            })
            .addCase(deleteAdvertisement.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete advertisement';
            });
    }
});

export const { setSearchQuery } = advertisementSlice.actions;

// Default export
export default advertisementSlice.reducer;
