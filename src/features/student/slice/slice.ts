import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    studentCursachCreate,
    studentCursachDelete,
    studentCursachRead,
    studentReplaceCursach
} from "@/features/students/action/action";
import {Person} from "@/features/types";

export interface State {
    state: boolean;
    status: string;
    error: any;
    data: any; // Ваш тип данных здесь (StudentDTO[] | null)
    tableDataStudent: Person[];
    message: string;
}

const initialState: State = {
    state: false,
    status: '',
    error: null,
    data: null,
    message: '',
    tableDataStudent: [],
};

export const studentCursachSlice = createSlice({
    name: "studentCursach",
    initialState,
    reducers: {
        setTableDataStudentCursach(state, action: PayloadAction<Person[]>) {
            state.tableDataStudent = action.payload;
        },
        updateTableDataStudentCursach(state, action: PayloadAction<Person>) {
            state.tableDataStudent = state.tableDataStudent.map(item =>
                item.id === action.payload.id ? {...item, ...action.payload} : item
            );
        },
        setTableDataCreateStudentCursach(state, action: PayloadAction<Person>) {
            state.tableDataStudent.push(action.payload)
        }
    },
    extraReducers: builder => {
        // studentReplaceCursach --------------------------------------------------------------------------------------------------
        builder.addCase(studentReplaceCursach.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            // state.data = actions.payload
        });

        builder.addCase(studentReplaceCursach.pending, state => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(studentReplaceCursach.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // studentUpdate --------------------------------------------------------------------------------------------------

        // employeesRead -------------------------------------------------------------------------
        builder.addCase(studentCursachRead.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload;
        });

        builder.addCase(studentCursachRead.pending, state => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(studentCursachRead.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // employeesRead -------------------------------------------------------------------------


        // employeesRead -------------------------------------------------------------------------
        builder.addCase(studentCursachCreate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            // state.tableDataStudent.push(actions.payload)
        });

        builder.addCase(studentCursachCreate.pending, (state) => {
            state.status = 'loading';
        });

        builder.addCase(studentCursachCreate.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // employeesRead -------------------------------------------------------------------------


        // studentDelete --------------------------------------------------------------------------------------------------
        builder.addCase(studentCursachDelete.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            // state.data = actions.payload
        });

        builder.addCase(studentCursachDelete.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(studentCursachDelete.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });

    },
});


export default studentCursachSlice.reducer
export const {setTableDataStudentCursach, updateTableDataStudentCursach,setTableDataCreateStudentCursach} = studentCursachSlice.actions

