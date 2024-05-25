import {createSlice} from "@reduxjs/toolkit";
import {projectsStagesAnswer} from "@/features/stagesAnswer/action/action";
import {projectReports, projectsReportsWork, projectsStagesGrade} from "@/features/projectStagesGrade/action/action";


export const projectsStagesGrades = createSlice({
    name: "projects",
    initialState: {
        state: false,
        status: '',
        error: null,
        data: null,
    } as State,
    reducers: {},
    extraReducers: (builder) => {
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

        // projectsStagesGrade -------------------------------------------------------------------------
        builder.addCase(projectsStagesGrade.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(projectsStagesGrade.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(projectsStagesGrade.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // projectsStagesGrade -------------------------------------------------------------------------

        // projectReports -------------------------------------------------------------------------
        builder.addCase(projectReports.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(projectReports.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(projectReports.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // projectReports -------------------------------------------------------------------------

        // projectsReportsWork -------------------------------------------------------------------------
        builder.addCase(projectsReportsWork.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(projectsReportsWork.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(projectsReportsWork.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // projectsReportsWork -------------------------------------------------------------------------
    }
});

export default projectsStagesGrades.reducer

export interface State {
    state: boolean;
    status: string;
    error: any;
    data: any;
}