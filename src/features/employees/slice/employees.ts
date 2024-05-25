import {createSlice} from "@reduxjs/toolkit";
import {employeesCreate, employeesFind, employeesRead, employeesReplace} from "@/features/employees/action/action";



export const employees = createSlice({
    name: "employees",
    initialState: {
        state: false,
        status: '',
        error: null,
        data: null,
    } as State,
    reducers: {},
    extraReducers: (builder) => {
        // employeesCreate -------------------------------------------------------------------------
        builder.addCase(employeesCreate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(employeesCreate.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(employeesCreate.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // employeesCreate -------------------------------------------------------------------------

        // employeesRead -------------------------------------------------------------------------
        builder.addCase(employeesRead.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(employeesRead.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(employeesRead.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // employeesRead -------------------------------------------------------------------------

        // employeesFind -------------------------------------------------------------------------
        builder.addCase(employeesFind.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(employeesFind.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(employeesFind.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // employeesFind -------------------------------------------------------------------------

        // employeesReplace -------------------------------------------------------------------------
        builder.addCase(employeesReplace.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(employeesReplace.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(employeesReplace.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // employeesReplace -------------------------------------------------------------------------

    }
});

export default employees.reducer

export interface State {
    state: boolean;
    status: string;
    error: any;
    data: any;
}