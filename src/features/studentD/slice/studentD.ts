import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Person} from "@/features/types";
import {
    studentCreateDiplom,
    studentDeleteDiplom,
    studentReadDiplom,
    studentReplaceDiplom
} from "@/features/studentD/action/action";

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

export const studentDimpomSlice = createSlice({
    name: "studentDiplom",
    initialState,
    reducers: {
        setTableDataStudentDiplom(state, action: PayloadAction<Person[]>) {
            state.tableDataStudent = action.payload;
        },
        updateTableDataStudentDiplom(state, action: PayloadAction<Person>) {
            state.tableDataStudent = state.tableDataStudent.map(item =>
                item.id === action.payload.id ? {...item, ...action.payload} : item
            );
        },
        setTableDataCreateStudentDiplom(state, action: PayloadAction<Person>) {
            state.tableDataStudent.push(action.payload)
        }
    },
    extraReducers: builder => {
        // studentReplaceCursach --------------------------------------------------------------------------------------------------
        builder.addCase(studentReplaceDiplom.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            // state.data = actions.payload
        });

        builder.addCase(studentReplaceDiplom.pending, state => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(studentReplaceDiplom.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // studentUpdate --------------------------------------------------------------------------------------------------

        // employeesRead -------------------------------------------------------------------------
        builder.addCase(studentReadDiplom.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload;
        });

        builder.addCase(studentReadDiplom.pending, state => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(studentReadDiplom.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // employeesRead -------------------------------------------------------------------------


        // employeesRead -------------------------------------------------------------------------
        builder.addCase(studentCreateDiplom.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            // state.tableDataStudent.push(actions.payload)
        });

        builder.addCase(studentCreateDiplom.pending, (state) => {
            state.status = 'loading';
        });

        builder.addCase(studentCreateDiplom.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // employeesRead -------------------------------------------------------------------------


        // studentDelete --------------------------------------------------------------------------------------------------
        builder.addCase(studentDeleteDiplom.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            // state.data = actions.payload
        });

        builder.addCase(studentDeleteDiplom.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(studentDeleteDiplom.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });

    },
});


export default studentDimpomSlice.reducer
export const {setTableDataStudentDiplom,setTableDataCreateStudentDiplom,updateTableDataStudentDiplom,} = studentDimpomSlice.actions

