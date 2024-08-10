import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const getDemo = createAsyncThunk('demo/getDemo', async (_, thunkAPI) => {
    try {
        const { data } = await axios.get('/api/v1/demo');
        console.log(import.meta.env.VITE_API_URL);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const getDemoAll = createAsyncThunk('demo/getDemoAll', async (_, thunkAPI) => {
    try {
        const { data } = await axios.get('/api/v1/demo/all');
        return data.content;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});
