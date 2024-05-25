import {createSlice} from "@reduxjs/toolkit";
import {
    projectStages,
    projectStagesRead,
    projectStagesReadComplete,
    projectStagesReplace
} from "@/features/stages/action/action";



export const stages = createSlice({
    name: "stages",
    initialState: {
        state: false,
        status: '',
        error: null,
        data: null,
    } as State,
    reducers: {},
    extraReducers: (builder) => {

        // projectStages -------------------------------------------------------------------------
        builder.addCase(projectStages.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(projectStages.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(projectStages.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // projectStages -------------------------------------------------------------------------

        // projectStagesReplace -------------------------------------------------------------------------
        builder.addCase(projectStagesReplace.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(projectStagesReplace.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(projectStagesReplace.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // projectStagesReplace -------------------------------------------------------------------------


        // projectStagesRead -------------------------------------------------------------------------
        builder.addCase(projectStagesRead.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(projectStagesRead.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(projectStagesRead.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // projectStagesRead -------------------------------------------------------------------------

        // projectStagesReadComplete -------------------------------------------------------------------------
        builder.addCase(projectStagesReadComplete.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(projectStagesReadComplete.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(projectStagesReadComplete.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // projectStagesReadComplete -------------------------------------------------------------------------
    }
});

export default stages.reducer

export interface State {
    state: boolean;
    status: string;
    error: any;
    data: any;
}