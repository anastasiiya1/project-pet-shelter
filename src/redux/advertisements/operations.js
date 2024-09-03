import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const fetchAdvertisements = createAsyncThunk('advertisements/fetchAll', async (_, thunkAPI) => {
  try {
      const { data } = await axios.get('/api/v1/ad');
      // console.log('Data Content:', data.content);
      return data.content;
  } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
  }
});

export const addNewAdvertisement = createAsyncThunk('advertisement/addNew', async (formData, thunkAPI) => {
    try {
        const { data } = await axios.post('/api/v1/ad', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    } catch (err) {
        console.error('Error adding advertisement:', err.response ? err.response.data : err.message);
        return thunkAPI.rejectWithValue(err.response ? err.response.data : err.message);
    }
});

export const deleteAdvertisement = createAsyncThunk(
  'advertisements/delete',
  async (adId, thunkAPI) => {
    try {
      await axios.delete(`/api/v1/ad/${adId}`);
      return adId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

