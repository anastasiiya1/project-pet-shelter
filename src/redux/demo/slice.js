import { createSlice } from "@reduxjs/toolkit";
import { getDemo, getDemoAll } from "./operations";

// const handlePending = (state) => {
//     state.isLoading = true;
// };

// const handleReject = (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
// };

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
            .addCase(getDemo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDemo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.demo = action.payload; // Переконайся, що `action.payload` існує
                state.error = false;
            })
            .addCase(getDemo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getDemoAll.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDemoAll.fulfilled, (state, action) => {
                state.isLoading = false;
                state.records = action.payload; // Переконайся, що `action.payload` існує
                state.error = false;
            })
            .addCase(getDemoAll.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});
export const demoReducer = demoSlice.reducer;