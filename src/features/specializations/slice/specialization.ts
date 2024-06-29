import {createSlice} from "@reduxjs/toolkit";
import {
    specializationsCreate,
    specializationsDelete,
    specializationsRead,
    specializationsUpdate
} from "@/features/specializations/action/action";
import {SpecializationDTO} from "@/features/types";
import action from "@/features/group/action/action";

export interface State {
    status: 'init' | 'loading' | 'success' | 'error'
    error: any;
    data: SpecializationDTO[];
    tableCardSpecializations: SpecializationDTO[];
    message: string;
}


export const specializationsSlice = createSlice({
    name: "specializations",
    initialState: {
        status: 'init',
        error: null,
        data: [],
        tableCardSpecializations: [],
        message: ''
    } as State,
    reducers: {
        setCardSpecializations: (state, action) => {
            state.tableCardSpecializations = action.payload;
        },
        setCardCreateSpecializations: (state, action) => {
            state.tableCardSpecializations.push(action.payload);
        },
        updateTableDataSpecialization: (state, action) => {
            state.tableCardSpecializations = state.tableCardSpecializations.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        name: action.payload.name
                    };
                }
                return item;
            });
        },
        setSpecializationMessageZero(state) {
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        // specializationGet -------------------------------------------------------------------------
        builder.addCase(specializationsRead.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.data = action.payload
        });

        builder.addCase(specializationsRead.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(specializationsRead.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // specializationGet -------------------------------------------------------------------------

        // specializationCreate -------------------------------------------------------------------------
        builder.addCase(specializationsCreate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.message = action.payload
        });

        builder.addCase(specializationsCreate.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(specializationsCreate.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // specializationCreate -------------------------------------------------------------------------

        // specializationUpdate -------------------------------------------------------------------------
        builder.addCase(specializationsUpdate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.message = action.payload
        });

        builder.addCase(specializationsUpdate.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(specializationsUpdate.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // specializationUpdate -------------------------------------------------------------------------

        // specializationDelete -------------------------------------------------------------------------
        builder.addCase(specializationsDelete.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.message = action.payload
        });

        builder.addCase(specializationsDelete.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(specializationsDelete.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // specializationDelete -------------------------------------------------------------------------

    }
});

export default specializationsSlice.reducer
export const {setCardSpecializations,updateTableDataSpecialization,setCardCreateSpecializations,setSpecializationMessageZero} = specializationsSlice.actions

