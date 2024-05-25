import {createSlice} from "@reduxjs/toolkit";
import {
    specializationsCreate,
    specializationsDelete,
    specializationsRead,
    specializationsUpdate
} from "@/features/specializations/action/action";


export const specializations = createSlice({
    name: "specializations",
    initialState: {
        state: false,
        status: '',
        error: null,
        data: null,
    } as State,
    reducers: {},
    extraReducers: (builder) => {
        // specializationGet -------------------------------------------------------------------------
        builder.addCase(specializationsRead.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(specializationsRead.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(specializationsRead.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // specializationGet -------------------------------------------------------------------------

        // specializationCreate -------------------------------------------------------------------------
        builder.addCase(specializationsCreate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(specializationsCreate.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(specializationsCreate.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // specializationCreate -------------------------------------------------------------------------

        // specializationUpdate -------------------------------------------------------------------------
        builder.addCase(specializationsUpdate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(specializationsUpdate.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(specializationsUpdate.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // specializationUpdate -------------------------------------------------------------------------

        // specializationDelete -------------------------------------------------------------------------
        builder.addCase(specializationsDelete.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(specializationsDelete.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(specializationsDelete.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // specializationDelete -------------------------------------------------------------------------

    }
});

export default specializations.reducer

export interface State {
    state: boolean;
    status: string;
    error: any;
    data: any;
}