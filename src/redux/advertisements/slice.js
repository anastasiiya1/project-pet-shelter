import { createSlice } from '@reduxjs/toolkit';
import { fetchAdvertisements, addNewAdvertisement, deleteAdvertisement } from './operations';

const handlePending = (state) => {
    state.isLoading = true;
};

const handleReject = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const advertisementSlice = createSlice({
    name: 'advertisements',
    initialState: {
        items: [],
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdvertisements.pending, handlePending)
            .addCase(fetchAdvertisements.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchAdvertisements.rejected, handleReject)
            .addCase(addNewAdvertisement.pending, handlePending)
            .addCase(addNewAdvertisement.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
            })
            .addCase(addNewAdvertisement.rejected, handleReject)
            .addCase(deleteAdvertisement.pending, handlePending)
            .addCase(deleteAdvertisement.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.items.findIndex((advert) => advert.id === action.payload.id);
                state.items.splice(index, 1);
            })
            .addCase(deleteAdvertisement.rejected, handleReject);
    }
});

export const advertisementsReducer = advertisementSlice.reducer;
