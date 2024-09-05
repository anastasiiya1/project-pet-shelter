import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const setAuthHeader = (token) => {
    if (token) {
        console.log('Setting auth header with token:', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        console.log('Removing auth header');
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
    console.log('Dispatching loginUser with:', { email, password });
    try {
        const { data } = await axios.post('/api/v1/user/login', { email, password });
        console.log('Login response data:', data);
        setAuthHeader(data.token);
        return data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    console.log('Dispatching registerUser with:', userData);
    try {
        const { data } = await axios.post('/api/v1/user/signup', userData);
        console.log('Register response data:', data);
        setAuthHeader(data.token);
        return data;
    } catch (err) {
        console.error('Register error:', err);
        console.error('Register error status:', err.response?.status);
        console.error('Register error message:', err.message);
        return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
});
