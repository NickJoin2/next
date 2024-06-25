import {createSlice} from "@reduxjs/toolkit";
import {
    groupCreate,
    groupCreateStudent,
    groupDelete,
    groupFindRead,
    groupRead,
    groupUpdate
} from "@/features/group/action/action";
import {GroupDTO, StudentDTO} from "@/features/types";



export interface State {
    status: 'init' | 'loading' | 'success' | 'error';
    error: any;
    data: GroupDTO[];
    groupCard: GroupDTO[];
    message: string;
    studentTable:StudentDTO[];
}



export const groupSlice = createSlice({
    name: "group",
    initialState: {
        status: 'init',
        error: null,
        data: [],
        groupCard: [],
        message: '',
        studentTable: []
    } as State,
    reducers: {
        setGroup: (state, action) => {
            state.groupCard = action.payload;
        },
        setGroupCreate: (state, action) => {
            state.groupCard.push(action.payload);
        },
        setGroupUpdate: (state, action) => {
            state.groupCard = state.groupCard.map(item => {
                if (item.id === action.payload.groupId) {
                    return {
                        ...item,
                        name: action.payload.name,
                        specializationId: action.payload.specializationId,
                    };
                }
                return item;
            });
        },
    },
    extraReducers: (builder) => {

        // groupRead ------------------------------------------------------------------------------------------
        builder.addCase(groupRead.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.data = action.payload
        });

        builder.addCase(groupRead.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(groupRead.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // groupRead ------------------------------------------------------------------------------------------


        // groupCreate ------------------------------------------------------------------------------------------
        builder.addCase(groupCreate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.message = action.payload
        });

        builder.addCase(groupCreate.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(groupCreate.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // groupCreate ------------------------------------------------------------------------------------------



        // groupDelete ------------------------------------------------------------------------------------------
        builder.addCase(groupDelete.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.message = action.payload
        });

        builder.addCase(groupDelete.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(groupDelete.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // groupDelete ------------------------------------------------------------------------------------------


        // groupUpdate ------------------------------------------------------------------------------------------
        builder.addCase(groupUpdate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.message = action.payload
        });

        builder.addCase(groupUpdate.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(groupUpdate.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // groupUpdate ------------------------------------------------------------------------------------------

        // groupCreateStudent ------------------------------------------------------------------------------------------
        builder.addCase(groupCreateStudent.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.message = action.payload
        });

        builder.addCase(groupCreateStudent.pending, (state) => {
            state.error = null;
            state.status = 'loading';
        });

        builder.addCase(groupCreateStudent.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        });
        // groupCreateStudent ------------------------------------------------------------------------------------------



        // groupFindRead ------------------------------------------------------------------------------------------
        // builder.addCase(groupFindRead.fulfilled, (state, action) => {
        //     state.status = 'success';
        //     state.error = null;
        //     state.data = action.payload
        // });
        //
        // builder.addCase(groupFindRead.pending, (state) => {
        //     state.error = null;
        //     state.status = 'loading';
        // });
        //
        // builder.addCase(groupFindRead.rejected, (state, action) => {
        //     state.error = action.payload
        //     state.status = 'error';
        // });
        // groupFindRead ------------------------------------------------------------------------------------------


    }
});

export default groupSlice.reducer
export const {setGroup,setGroupCreate,setGroupUpdate} = groupSlice.actions
