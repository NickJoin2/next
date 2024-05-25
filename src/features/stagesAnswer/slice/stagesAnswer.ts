import {createSlice} from "@reduxjs/toolkit";
import {
    projectsStagesAnswer,
    projectsStagesAnswerReturn,
    projectStagesCreate
} from "@/features/stagesAnswer/action/action";


export const stagesAnswer = createSlice({
    name: "projectStages",
    initialState: {
        state: false,
        status: '',
        error: null,
        data: null,
    } as State,
    reducers: {},
    extraReducers: (builder) => {
        // projectStagesCreate -------------------------------------------------------------------------
        builder.addCase(projectStagesCreate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(projectStagesCreate.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(projectStagesCreate.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // projectStagesCreate -------------------------------------------------------------------------

        // projectsStagesAnswerReturn -------------------------------------------------------------------------
        builder.addCase(projectsStagesAnswerReturn.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(projectsStagesAnswerReturn.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(projectsStagesAnswerReturn.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // projectsStagesAnswerReturn -------------------------------------------------------------------------

        // projectsStagesAnswer -------------------------------------------------------------------------
        builder.addCase(projectsStagesAnswer.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(projectsStagesAnswer.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(projectsStagesAnswer.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // projectsStagesAnswer -------------------------------------------------------------------------
    }
});

export default stagesAnswer.reducer

export interface State {
    state: boolean;
    status: string;
    error: any;
    data: any;
}