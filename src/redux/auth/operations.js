import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post('/user', userData);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);