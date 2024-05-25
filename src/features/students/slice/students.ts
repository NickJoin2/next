import {createSlice} from "@reduxjs/toolkit";
import {studentRead, studentReload, studentUpdate} from "@/features/students/action/action";



export const student = createSlice({
    name: "student",
    initialState: {
        state: false,
        status: '',
        error: null,
        data: null,
    } as State,
    reducers: {},
    extraReducers: (builder) => {
        // studentUpdate --------------------------------------------------------------------------------------------------
        builder.addCase(studentUpdate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(studentUpdate.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(studentUpdate.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // studentUpdate --------------------------------------------------------------------------------------------------


        // studentRead --------------------------------------------------------------------------------------------------
        builder.addCase(studentRead.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(studentRead.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(studentRead.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });

        // studentRead --------------------------------------------------------------------------------------------------


        // studentReload --------------------------------------------------------------------------------------------------
        builder.addCase(studentReload.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(studentReload.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(studentReload.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });

        // studentReload --------------------------------------------------------------------------------------------------

    }
});

export default student.reducer

export interface State {
    state: boolean;
    status: string;
    error: any;
    data: any;
    message: string;
}