import {createSlice} from "@reduxjs/toolkit";
import {
    disciplinesAssign,
    disciplinesCreate,
    disciplinesRead,
    disciplinesUpdate
} from "@/features/disciplines/action/action";


export const disciplines = createSlice({
    name: "disciplines",
    initialState: {
        state: false,
        status: '',
        error: null,
        data: null,
    } as State,
    reducers: {},
    extraReducers: (builder) => {
        // disciplinesCreate -------------------------------------------------------------------------
        builder.addCase(disciplinesCreate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(disciplinesCreate.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(disciplinesCreate.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // disciplinesCreate -------------------------------------------------------------------------


        // disciplinesRead -------------------------------------------------------------------------
        builder.addCase(disciplinesRead.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(disciplinesRead.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(disciplinesRead.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // disciplinesRead -------------------------------------------------------------------------


        // disciplinesUpdate -------------------------------------------------------------------------
        builder.addCase(disciplinesUpdate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(disciplinesUpdate.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(disciplinesUpdate.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // disciplinesUpdate -------------------------------------------------------------------------


        // disciplinesAssign -------------------------------------------------------------------------
        builder.addCase(disciplinesAssign.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(disciplinesAssign.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(disciplinesAssign.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // disciplinesAssign -------------------------------------------------------------------------
    }
});

export default disciplines.reducer

export interface State {
    state: boolean;
    status: string;
    error: any;
    data: any;
}