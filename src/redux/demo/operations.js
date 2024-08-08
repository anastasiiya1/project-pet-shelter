import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const getDemo = createAsyncThunk('/api/v1/demo/getDemo', async (_, thunkAPI) => {
    try {
        const { data } = await axios.get('/demo');
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const getDemoAll = createAsyncThunk('/api/v1/demo/getDemoAll', async (_, thunkAPI) => {
    try {
        const { data } = await axios.get('/demo/all');
        return data.content;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});