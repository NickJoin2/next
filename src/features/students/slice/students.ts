import {EmployeeDTO, Person, StudentDTO} from "@/features/types";
import {groupReadStudent, studentDelete, studentFind, studentReplace} from "@/features/student/actions/students";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface State {
    status: "init" | "loading" | "error" | "success"
    error: any;
    data: StudentDTO[];
    tableDataStudent: StudentDTO[];
    message: string;
    find: EmployeeDTO[];
    findData: StudentDTO[];
}

const initialState: State = {
    status: 'init',
    error: null,
    data: [],
    message: '',
    tableDataStudent: [],
    find: [],
    findData: []
};

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        // studentTable(state, action: PayloadAction<EmployeeDTO[]>) {
        //     const students = (action.payload || []).filter(item =>
        //         item.posts.some(post => post.id === 0)
        //     );
        //
        //     students.forEach(newStudent => {
        //         const exists = state.data.some(student => student.id === newStudent.id);
        //         if (!exists) {
        //             state.data.push(newStudent);
        //             state.tableDataStudent.push(newStudent);
        //         }
        //     });
        // },
        setTableStudentDelete(state, action: PayloadAction<StudentDTO[]>) {
            state.tableDataStudent = action.payload;
        },
        setTableDataGroupStudentDelete(state, action:PayloadAction<StudentDTO[]>) {
            state.findData = action.payload;
        },
        updateTableStudentGroup: (state, action) => {
            state.findData = state.findData.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        firstName: action.payload.firstName,
                        lastName: action.payload.lastName,
                        middleName: action.payload.middleName,
                        blocked: action.payload.blocked,
                    };
                }
                return item;
            });
        },
        updateTableStudent: (state, action) => {
            state.tableDataStudent = state.tableDataStudent.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        firstName: action.payload.firstName,
                        lastName: action.payload.lastName,
                        middleName: action.payload.middleName,
                        blocked: action.payload.blocked,
                    };
                }
                return item;
            });
        },
    },
    extraReducers: builder => {
        // studentFind --------------------------------------------------------------------------------------------------
        builder.addCase(studentFind.fulfilled, (state, action: PayloadAction<EmployeeDTO>) => {
            state.status = 'success';
            state.error = null;
            state.find = [action.payload];
        });

        builder.addCase(studentFind.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(studentFind.rejected, (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.status = 'error';
            state.message = action.payload;
        });
        // studentFind --------------------------------------------------------------------------------------------------

        // studentReplace --------------------------------------------------------------------------------------------------
        builder.addCase(studentReplace.fulfilled, (state, action: PayloadAction<EmployeeDTO>) => {
            state.status = 'success';
            state.error = null;
        });

        builder.addCase(studentReplace.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(studentReplace.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // studentReplace --------------------------------------------------------------------------------------------------

        // studentDelete --------------------------------------------------------------------------------------------------
        builder.addCase(studentDelete.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.message = action.payload
        });

        builder.addCase(studentDelete.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(studentDelete.rejected, (state, action) => {
            state.error = action.payload;
            state.message = action.payload
            state.status = 'error';
        });
        // studentDelete --------------------------------------------------------------------------------------------------


        // groupReadStudent ------------------------------------------------------------------------------------------
        builder.addCase(groupReadStudent.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.findData = action.payload
        });

        builder.addCase(groupReadStudent.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(groupReadStudent.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // groupReadStudent ------------------------------------------------------------------------------------------
    },
});


export default studentSlice.reducer
export const {updateTableStudent,setTableStudentDelete,setTableDataGroupStudentDelete,updateTableStudentGroup} = studentSlice.actions

