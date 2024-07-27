import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const getUserProfilePhoto = createAsyncThunk(
	'photos/getUserProfilePhoto',
	async (userId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/photo/user/${userId}`);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const uploadUserProfilePhoto = createAsyncThunk(
    'photos/uploadUserProfilePhoto',
    async ({ userId, newPhoto }, thunkAPI) => {
        try {
            const { data } = await axios.post(`/api/v1/photo/user/${userId}`, newPhoto);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const deleteUserProfilePhoto = createAsyncThunk(
	'photos/deleteUserProfilePhoto',
	async (userId, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/api/v1/photo/user/${userId}`);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const getAllAdvertPhotos = createAsyncThunk(
	'photos/getAllAdvertPhotos',
	async (adId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/photo/ad/${adId}`);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const uploadAdvertsPhoto = createAsyncThunk(
    'photos/uploadAdvertsPhoto',
    async ({ adId, newPhoto }, thunkAPI) => {
        try {
            const { data } = await axios.post(`/api/v1/photo/ad/${adId}`, newPhoto);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const deleteAdvertPhotos = createAsyncThunk(
    'photos/deleteAdvertPhotos',
    async ({ adId, photoIds }, thunkAPI) => {
        try {
            const { data } = await axios.delete(`/api/v1/photo/ad/${adId}`, { data: photoIds });
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const downloadUserProfilePhotoFile = createAsyncThunk(
    'file/downloadUserProfilePhotoFile',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.get(`/api/v1/file/user/${userId}`, { responseType: 'blob' });
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const getAdvertsPhotoFiles = createAsyncThunk(
	'file/getAdvertsPhotoFiles',
	async (adId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/file/ad/${adId}`);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const downloadPhotoById = createAsyncThunk(
	'file/downloadPhotoById',
	async ({ adId, photoId }, thunkAPI) => {
    try {
        const response = await axios.get(`/api/v1/file/ad/${adId}/photo/${photoId}`, { responseType: 'blob' });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});
