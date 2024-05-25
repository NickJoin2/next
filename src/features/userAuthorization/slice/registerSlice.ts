import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';


export const fetchRegister = createAsyncThunk<string, { email: string; password: string }, { rejectValue:  Errors  }>(
    'register/save',
    async ({email, password}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            if (response.status === 400) {
                const error:  RootInterface = await response.json();
                const errors = error.errors
                return thunkAPI.rejectWithValue(errors);
            }

            const data: Root = await response.json();
            localStorage.setItem('token', data.token)
            return data.token
        } catch (error) {
            return thunkAPI.rejectWithValue(error as Errors);
        }

    }
);

export const registerSlice = createSlice({
    name: "register",
    initialState: {
        token: '',
        status: '',
        error: null,
    } as State,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.token = action.payload;
        });
        builder.addCase(fetchRegister.rejected, (state, action) => {
            state.error = action.payload
            state.token = ''
            state.status = 'fails'
        });
    }
});

export default registerSlice.reducer;

export interface State {
    token: string;
    status: string;
    error: any
    message: string;
}

export interface RootInterface {
    success: boolean;
    errors: Errors;
}

export interface Errors {
    email: string[];
    password: string[];
    message: string
}

interface Root {
    message: 'string',
    errors: Errors;
    token: string;
}
