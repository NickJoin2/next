import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    disciplinesAssign,
    disciplinesCreate, disciplinesDelete,
    disciplinesRead, disciplinesUnassign,
    disciplinesUpdate
} from "@/features/disciplines/action/action";
import {DisciplineDTO, EmployeeDTO} from "@/features/types";



export interface State {
    status: 'init' | 'loading' | 'success' | 'error'
    error: any;
    data: DisciplineDTO[];
    message: string;
    cardDisciplines: DisciplineDTO[];
    teacherCard: EmployeeDTO[];
    dataEmployees: EmployeeDTO[];
}



export const disciplinesSlice = createSlice({
    name: "disciplines",
    initialState: {
        status: 'init',
        dataEmployees: [],
        error: null,
        data: [],
        message: '',
        cardDisciplines: [],
        teacherCard: []
    } as State,
    reducers: {
        setCardDisciplines: (state, action) => {
            state.cardDisciplines = action.payload;
        },
        setCreateCardDisciplines: (state, action) => {
            state.cardDisciplines.push(action.payload)
        },
        updateTableDataDisciplines: (state, action) => {
            state.cardDisciplines = state.cardDisciplines.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        name: action.payload.name
                    };
                }
                return item;
            });
        },
        tableDisciplinesDataEmployees: (state, action) => {
          state.dataEmployees = action.payload;
        },
        
    },
    extraReducers: (builder) => {
        // disciplinesCreate -------------------------------------------------------------------------
        builder.addCase(disciplinesCreate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            // state.data = action.payload
            state.message = action.payload
        });

        builder.addCase(disciplinesCreate.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(disciplinesCreate.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // disciplinesCreate -------------------------------------------------------------------------


        // disciplinesRead -------------------------------------------------------------------------
        builder.addCase(disciplinesRead.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.data = action.payload
        });

        builder.addCase(disciplinesRead.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(disciplinesRead.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // disciplinesRead -------------------------------------------------------------------------


        // disciplinesUpdate -------------------------------------------------------------------------
        builder.addCase(disciplinesUpdate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.message = action.payload
        });

        builder.addCase(disciplinesUpdate.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(disciplinesUpdate.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // disciplinesUpdate -------------------------------------------------------------------------


        // disciplinesAssign -------------------------------------------------------------------------
        builder.addCase(disciplinesAssign.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.message = action.payload
        });

        builder.addCase(disciplinesAssign.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(disciplinesAssign.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // disciplinesAssign -------------------------------------------------------------------------


        // disciplinesDelete -------------------------------------------------------------------------
        builder.addCase(disciplinesDelete.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.message = action.payload
        });

        builder.addCase(disciplinesDelete.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(disciplinesDelete.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // disciplinesDelete -------------------------------------------------------------------------


        // disciplinesUnassign -------------------------------------------------------------------------
        builder.addCase(disciplinesUnassign.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.message = action.payload
        });

        builder.addCase(disciplinesUnassign.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(disciplinesUnassign.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // disciplinesUnassign -------------------------------------------------------------------------
    }
});

export default disciplinesSlice.reducer
export const {setCardDisciplines,setCreateCardDisciplines,tableDisciplinesDataEmployees,updateTableDataDisciplines} =  disciplinesSlice.actions

