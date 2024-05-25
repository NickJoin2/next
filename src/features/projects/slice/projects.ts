import {createSlice} from "@reduxjs/toolkit";
import {
    projectComplete,
    projectCreate,
    projectFind,
    projectRead,
    projectUpdate
} from "@/features/projects/action/action";



export const projects = createSlice({
    name: "projects",
    initialState: {
        state: false,
        status: '',
        error: null,
        data: null,
    } as State,
    reducers: {},
    extraReducers: (builder) => {
        // projectCreate -------------------------------------------------------------------------
        builder.addCase(projectCreate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(projectCreate.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(projectCreate.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // projectCreate -------------------------------------------------------------------------

        // projectRead -------------------------------------------------------------------------
        builder.addCase(projectRead.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(projectRead.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(projectRead.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // projectRead -------------------------------------------------------------------------

        // projectFind -------------------------------------------------------------------------
        builder.addCase(projectFind.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(projectFind.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(projectFind.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // projectFind -------------------------------------------------------------------------


        // projectComplete -------------------------------------------------------------------------
        builder.addCase(projectComplete.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(projectComplete.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(projectComplete.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // projectComplete -------------------------------------------------------------------------


        // projectUpdate -------------------------------------------------------------------------
        builder.addCase(projectUpdate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(projectUpdate.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(projectUpdate.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // projectUpdate -------------------------------------------------------------------------

    }
});

export default projects.reducer

export interface State {
    state: boolean;
    status: string;
    error: any;
    data: any;
}