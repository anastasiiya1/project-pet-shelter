import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const fetchAdvertisements = createAsyncThunk(
	'advertisements/fetchAll',
	async (_, thunkAPI) => {
    try {
        const { data } = await axios.get('/ad');
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const addNewAdvertisement = createAsyncThunk(
	'advertisement/addNew',
	async (newAdvertisement, thunkAPI) => {
    try {
        const { data } = await axios.post('/ad', newAdvertisement);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const deleteAdvertisement = createAsyncThunk(
	'advertisements/delete',
	async (adId, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/ad/${adId}`);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});
