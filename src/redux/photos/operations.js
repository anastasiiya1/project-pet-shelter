import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// Fetch user profile photo
export const getUserProfilePhoto = createAsyncThunk('photos/getUserProfilePhoto', async (userId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/photo/user/${userId}`);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

// Upload user profile photo
export const uploadUserProfilePhoto = createAsyncThunk(
    'photos/uploadUserProfilePhoto',
    async ({ userId, file }, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const { data } = await axios.post(`/api/v1/photo/user/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// Delete user profile photo
export const deleteUserProfilePhoto = createAsyncThunk('photos/deleteUserProfilePhoto', async (userId, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/api/v1/photo/user/${userId}`);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

// Retrieve all photos for an advertisement
export const getAllAdvertPhotos = createAsyncThunk('photos/getAllAdvertPhotos', async (adId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/photo/ad/${adId}`);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

// Upload photos for an advertisement
export const uploadAdvertsPhoto = createAsyncThunk('photos/uploadAdvertsPhoto', async ({ adId, files }, thunkAPI) => {
    try {
        const formData = new FormData();
        files.forEach((file) => formData.append('files[]', file));
        const { data } = await axios.post(`/api/v1/photo/ad/${adId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

// Delete specific photos for an advertisement
export const deleteAdvertPhotos = createAsyncThunk(
    'photos/deleteAdvertPhotos',
    async ({ adId, photoIds }, thunkAPI) => {
        try {
            const { data } = await axios.delete(`/api/v1/photo/ad/${adId}`, {
                data: photoIds
            });
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// Download a user's profile picture file
export const downloadUserProfilePhotoFile = createAsyncThunk(
    'file/downloadUserProfilePhotoFile',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.get(`/api/v1/file/user/${userId}`, { responseType: 'blob' });
            const url = URL.createObjectURL(response.data);
            return url;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// Retrieve all photo files for an advertisement
export const getAdvertsPhotoFiles = createAsyncThunk('file/getAdvertsPhotoFiles', async (adId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/file/ad/${adId}`);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

// Download a specific photo by photoId
export const downloadPhotoById = createAsyncThunk('file/downloadPhotoById', async ({ adId, photoId }, thunkAPI) => {
    try {
        const response = await axios.get(`/api/v1/file/ad/${adId}/photo/${photoId}`, { responseType: 'blob' });
        const url = URL.createObjectURL(response.data);
        return url;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const getAdvertThumbnail = createAsyncThunk(
    'photos/getAdvertThumbnail',
    async ({ adId, thumbnailId }, thunkAPI) => {
        try {
            const response = await axios.get(`/api/v1/file/ad/${adId}/photo/${thumbnailId}`, {
                responseType: 'blob'
            });
            const url = URL.createObjectURL(response.data);
            return url;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);
