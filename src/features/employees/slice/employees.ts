import {createSlice} from "@reduxjs/toolkit";
import {
    employeesCreate,
    employeesDelete, employeesFind,
    employeesRead,
    employeesReplace
} from "@/features/employees/action/action";
import {CreateEmployeeCommand, EmployeeDTO} from "@/features/types";



export const employees = createSlice({
    name: "employees",
    initialState: {
        status: "init",
        error: null,
        data: null,
        worker: null,
        tableData: [],
    } as State,
    reducers: {
        setTableData(state, action) {
            state.tableData = action.payload;
        },
        setTableDataCreate(state, action) {
            state.tableData.push(action.payload);
        },
        updateTableData: (state, action) => {
            state.tableData = state.tableData.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        firstName: action.payload.firstName,
                        lastName: action.payload.lastName,
                        middleName: action.payload.middleName,
                        posts: action.payload.posts,
                    };
                }
                return item;
            });
        },
    },
         extraReducers: (builder) => {

            // employeesCreate -------------------------------------------------------------------------
             builder.addCase(employeesCreate.fulfilled, (state, action) => {
                 state.status = 'success';
                 state.error = null;
             });

             builder.addCase(employeesCreate.pending, (state) => {
                 state.error = null;
                 state.status = 'loading';
             });

             builder.addCase(employeesCreate.rejected, (state, action) => {
                 state.error = action.payload;
                 state.status = 'error';
             });
             // employeesCreate -------------------------------------------------------------------------

             // employeesRead -------------------------------------------------------------------------
             builder.addCase(employeesRead.fulfilled, (state, action) => {
                 state.status = 'success';
                 state.error = null;
                 state.data = action.payload
             });

             builder.addCase(employeesRead.pending, (state) => {
                 state.error = null;
                 state.status = 'loading';
             });

             builder.addCase(employeesRead.rejected, (state, action) => {
                 state.error = action.payload;
                 state.status = 'error';
             });
             // employeesRead -------------------------------------------------------------------------

             // employeesFind -------------------------------------------------------------------------
             builder.addCase(employeesFind.fulfilled, (state, action) => {
                 state.status = 'success';
                 state.error = null;
                 state.data = action.payload
             });

             builder.addCase(employeesFind.pending, (state) => {
                 state.error = null;
                 state.status = 'loading';
             });

             builder.addCase(employeesFind.rejected, (state, action) => {
                 state.error = action.payload;
                 state.status = 'error';
             });
             // employeesFind -------------------------------------------------------------------------

             // employeesReplace -------------------------------------------------------------------------
             builder.addCase(employeesReplace.fulfilled, (state, action) => {
                 state.status = 'success';
                 state.error = null;
             });

             builder.addCase(employeesReplace.pending, (state) => {
                 state.error = null;
                 state.status = 'loading';
             });

             builder.addCase(employeesReplace.rejected, (state, action) => {
                 state.error = action.payload;
                 state.status = 'error';
             });
             // employeesReplace -------------------------------------------------------------------------


             // employeesDelete -------------------------------------------------------------------------
             builder.addCase(employeesDelete.fulfilled, (state, action) => {
                 state.status = 'success';
                 state.error = null;
             });

             builder.addCase(employeesDelete.pending, (state) => {
                 state.error = null;
                 state.status = 'loading';
             });

             builder.addCase(employeesDelete.rejected, (state, action) => {
                 state.error = action.payload;
                 state.status = 'error';
             });
             // employeesDelete -------------------------------------------------------------------------
    }
});

export default employees.reducer
export const {setTableData,setTableDataCreate,updateTableData} = employees.actions

export interface State {
    status: "init" | "loading" | "error" | "success"
    error: any;
    data: any;
    tableData: EmployeeDTO[]
}