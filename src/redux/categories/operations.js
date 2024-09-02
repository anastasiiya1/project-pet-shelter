import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// get all categories
export const getCategories = createAsyncThunk('category/getCategories', async (_, thunkAPI) => {
    try {
        const { data } = await axios.get('/api/v1/category');
        return data.content;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

// get category by Id
export const getCategoryById = createAsyncThunk('category/getCategoryById', async (categoryId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/category/${categoryId}`);
        // console.log('fetch categ by ID from operations:', data);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

// update category by Id
export const updateCategory = createAsyncThunk('category/updateCategory', async ({ id, payload }, thunkAPI) => {
    try {
        const { data } = await axios.put(`/api/v1/category/${id}`, payload);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

// delete category by Id
export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id, thunkAPI) => {
    try {
        await axios.delete(`/api/v1/category/${id}`);
        return id;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});
