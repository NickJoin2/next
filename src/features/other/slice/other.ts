import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
    assentModal: boolean;
}

const initialState: State = {
    assentModal: false
};

export const otherSlice = createSlice({
    name: "other",
    initialState,
    reducers: {
        setAssentModal(state, action: PayloadAction<boolean>) {
            state.assentModal = action.payload;
        }
    },
});

export default otherSlice.reducer;

export const { setAssentModal } = otherSlice.actions;
