import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const getCategories = createAsyncThunk('category/getCategories', async (params, thunkAPI) => {
    try {
        const { data } = await axios.get('/api/v1/category', { params });
        return data.content;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const getCategoryById = createAsyncThunk('category/getCategoryById', async (categoryId, thunkAPI) => {
    try {
        const { data } = axios.get(`/api/v1/category/${categoryId}`);
        console.log(data);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const updateCategory = createAsyncThunk('/category/updateCategory', async ({ id, payload }, thunkAPI) => {
    try {
        const { data } = axios.put(`/api/v1/category/${id}`, payload);
        console.log(data);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const deleteCategory = createAsyncThunk('/category/deleteCategory', async (id, thunkAPI) => {
    try {
        const { data } = axios.delete(`/api/v1/category/${id}`);
        console.log(data);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});
