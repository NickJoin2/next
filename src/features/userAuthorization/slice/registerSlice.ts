
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
            console.log(data)
            document.cookie = `token=${data.token}`
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
        redirect: false,
    } as State,
    reducers: {
        logout: (state) => {
            document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
            localStorage.removeItem('token');
            state.redirect = true;
        }
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
export const { logout } = registerSlice.actions;

export interface State {
    token: string;
    status: string;
    error: any;
    message: string;
    redirect: boolean;
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
