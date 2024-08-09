import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await axios.post('/api/v1/user', userData);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
    try {
        const response = await axios.post('/login', { email, password });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});
