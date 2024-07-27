import { createSlice } from "@reduxjs/toolkit";
import { getDemo, getDemoAll } from "./operations";

const handlePending = (state) => {
    state.isLoading = true;
};

const handleReject = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const demoSlice = createSlice({
    name: 'demo',
    initialState: {
        demo: '',
        records: [],
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDemo.pending, handlePending)
            .addCase(getDemo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.demo = action.payload;
            })
            .addCase(getDemo.rejected, handleReject)

            .addCase(getDemoAll.pending, handlePending)
            .addCase(getDemoAll.fulfilled, (state, action) => {
                state.isLoading = false;
                state.records = action.payload;
            })
            .addCase(getDemoAll.rejected, handleReject);
    }
});

export const demoReducer = demoSlice.reducer;