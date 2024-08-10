import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const getDemo = createAsyncThunk('demo/getDemo', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/api/v1/demo');
        console.log('getDemo response:', response.data);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const getDemoAll = createAsyncThunk('demo/getDemoAll', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/api/v1/demo/all');
        console.log('getDemoAll response:', response.data);
        return response.data.content; 
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});