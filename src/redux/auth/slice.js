import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './operations';
import axios from 'axios';

const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null
};

const handlePending = (state) => {
    state.isLoading = true;
    state.error = null;
};

const handleFulfilled = (state, action) => {
    state.isLoading = false;
    state.user = action.payload.email;
    state.token = action.payload.accessToken;
    state.isLoggedIn = true;
    state.error = null;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            localStorage.removeItem('accessToken');
            delete axios.defaults.headers.common['Authorization'];
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, handlePending)
            .addCase(registerUser.fulfilled, handleFulfilled)
            .addCase(registerUser.rejected, handleRejected)
            .addCase(loginUser.pending, handlePending)
            .addCase(loginUser.fulfilled, handleFulfilled)
            .addCase(loginUser.rejected, handleRejected);
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
