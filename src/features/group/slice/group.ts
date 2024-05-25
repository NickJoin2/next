import {createSlice} from "@reduxjs/toolkit";
import {
    groupCreate,
    groupCreateStudent,
    groupDelete,
    groupFindRead,
    groupRead, groupReadStudent,
    groupUpdate
} from "@/features/group/action/action";


export const group = createSlice({
    name: "group",
    initialState: {
        state: false,
        status: '',
        error: null,
        data: null,
    } as State,
    reducers: {},
    extraReducers: (builder) => {
        // groupUpdate ------------------------------------------------------------------------------------------
        builder.addCase(groupUpdate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(groupUpdate.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(groupUpdate.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // groupUpdate ------------------------------------------------------------------------------------------

        // groupCreateStudent ------------------------------------------------------------------------------------------
        builder.addCase(groupCreateStudent.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(groupCreateStudent.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(groupCreateStudent.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // groupCreateStudent ------------------------------------------------------------------------------------------


        // groupRead ------------------------------------------------------------------------------------------
        builder.addCase(groupRead.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(groupRead.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(groupRead.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // groupRead ------------------------------------------------------------------------------------------


        // groupFindRead ------------------------------------------------------------------------------------------
        builder.addCase(groupFindRead.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(groupFindRead.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(groupFindRead.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // groupFindRead ------------------------------------------------------------------------------------------



        // groupCreate ------------------------------------------------------------------------------------------
        builder.addCase(groupCreate.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(groupCreate.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(groupCreate.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // groupCreate ------------------------------------------------------------------------------------------


        // groupDelete ------------------------------------------------------------------------------------------
        builder.addCase(groupDelete.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(groupDelete.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(groupDelete.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // groupDelete ------------------------------------------------------------------------------------------


        // groupReadStudent ------------------------------------------------------------------------------------------
        builder.addCase(groupReadStudent.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.state = true;
            state.data = action.payload
        });

        builder.addCase(groupReadStudent.pending, (state) => {
            state.error = null;
            state.state = false;
            state.status = 'loading';
        });

        builder.addCase(groupReadStudent.rejected, (state, action) => {
            state.error = action.payload;
            state.state = true;
            state.status = 'fails';
        });
        // groupReadStudent ------------------------------------------------------------------------------------------
    }
});

export default group.reducer

export interface State {
    state: boolean;
    status: string;
    error: any;
    data: any;
}