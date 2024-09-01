import { createSlice } from '@reduxjs/toolkit';
import { fetchAdvertisements, addNewAdvertisement, deleteAdvertisement } from './operations';

const advertisementSlice = createSlice({
    name: 'advertisements',
    initialState: {
        items: [],
        filteredItems: [],
        searchQuery: '',
        isLoading: false,
        error: null
    },
    reducers: {
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
            state.filteredItems = state.items.filter((advert) =>
                advert.title.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
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
                state.filteredItems = action.payload.filter((advert) =>
                    advert.title.toLowerCase().includes(state.searchQuery.toLowerCase())
                );
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
                    advert.title.toLowerCase().includes(state.searchQuery.toLowerCase())
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
                state.items = state.items.filter((advert) => advert.id !== action.payload.id);
                state.filteredItems = state.items.filter((advert) =>
                    advert.title.toLowerCase().includes(state.searchQuery.toLowerCase())
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