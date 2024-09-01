import { createSlice } from '@reduxjs/toolkit';
import {
    getUserProfilePhoto,
    uploadUserProfilePhoto,
    deleteUserProfilePhoto,
    getAllAdvertPhotos,
    uploadAdvertsPhoto,
    deleteAdvertPhotos,
    downloadUserProfilePhotoFile,
    getAdvertsPhotoFiles,
    downloadPhotoById
} from './operations';

const handlePending = (state) => {
    state.isLoading = true;
    state.error = null;
};

const handleReject = (state, action) => {
    state.isLoading = false;
    state.error = action.payload || 'An error occurred';
};

const photoSlice = createSlice({
    name: 'photos',
    initialState: {
        userProfilePhoto: null,
        advertPhotos: [],
        photoFiles: {},
        thumbnailId: null,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfilePhoto.pending, handlePending)
            .addCase(getUserProfilePhoto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userProfilePhoto = action.payload;
            })
            .addCase(getUserProfilePhoto.rejected, handleReject)

            .addCase(uploadUserProfilePhoto.pending, handlePending)
            .addCase(uploadUserProfilePhoto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userProfilePhoto = action.payload;
            })
            .addCase(uploadUserProfilePhoto.rejected, handleReject)

            .addCase(deleteUserProfilePhoto.pending, handlePending)
            .addCase(deleteUserProfilePhoto.fulfilled, (state) => {
                state.isLoading = false;
                state.userProfilePhoto = null;
            })
            .addCase(deleteUserProfilePhoto.rejected, handleReject)

            .addCase(getAllAdvertPhotos.pending, handlePending)
            .addCase(getAllAdvertPhotos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.advertPhotos = action.payload;
            })
            .addCase(getAllAdvertPhotos.rejected, handleReject)

            .addCase(uploadAdvertsPhoto.pending, handlePending)
            .addCase(uploadAdvertsPhoto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.advertPhotos.push(action.payload);
            })
            .addCase(uploadAdvertsPhoto.rejected, handleReject)

            .addCase(deleteAdvertPhotos.pending, handlePending)
            .addCase(deleteAdvertPhotos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.advertPhotos = state.advertPhotos.filter((photo) => !action.payload.includes(photo.id));
            })
            .addCase(deleteAdvertPhotos.rejected, handleReject)

            .addCase(downloadUserProfilePhotoFile.pending, handlePending)
            .addCase(downloadUserProfilePhotoFile.fulfilled, (state) => {
                state.isLoading = false;
                // Збереження URL або даних файлу при необхідності
            })
            .addCase(downloadUserProfilePhotoFile.rejected, handleReject)

            .addCase(getAdvertsPhotoFiles.pending, handlePending)
            .addCase(getAdvertsPhotoFiles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.photoFiles = action.payload;
            })
            .addCase(getAdvertsPhotoFiles.rejected, handleReject)

            .addCase(downloadPhotoById.pending, handlePending)
            .addCase(downloadPhotoById.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(downloadPhotoById.rejected, handleReject);
    }
});

export default photoSlice.reducer;