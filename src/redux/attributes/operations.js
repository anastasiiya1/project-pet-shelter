import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const getAllAttributes = createAsyncThunk('attributes/getAll', async (_, thunkAPI) => {
    try {
        const response = axios.get(`/api/v1/attribute`);

        console.log('response getAllAttributes', response);
        return response;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const createNewAttribute = createAsyncThunk('attributes/createNew', async (_, thunkAPI) => {
    try {
        const response = axios.post('/api/v1/attribute');

        console.log('response createNewAttributes', response);
        return response;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const getAttributeById = createAsyncThunk('attributes/getAttributeById', async({attrId}, thunkAPI) => {
	try{
		const response = axios.get(`/api/v1/attribute${attrId}`);

		console.log('response getAtrById', response);
		return response;
	}catch(err){
		return thunkAPI.rejectWithValue(err.message)
	}
})
