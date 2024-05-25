import {createAsyncThunk} from "@reduxjs/toolkit";

export const employeesCreate = createAsyncThunk<string, {fullName: string, posts: any}, { rejectValue:  any  }>(
    'employees/create',
    async ({fullName, posts}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/employees`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: fullName,
                    posts: posts,
                }),
            });

            if(response.status === 201) {
                const data: any = await response.json();
                return data
            } else if(response.status === 403) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);


export const employeesRead = createAsyncThunk<any, { rejectValue:  any  }>(
    'employees/read',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/employees`, {
                method: 'GET',
            });

            if(response.status === 200) {
                const data: any = await response.json();
                return data
            } else if(response.status === 403) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);


export const employeesFind = createAsyncThunk<string, {employeeId: number}, { rejectValue:  any  }>(
    'employees/find',
    async ({employeeId}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/employees/${employeeId}`, {
                method: 'GET',
            });

            if(response.status === 200) {
                const data: any = await response.json();
                return data
            } else if(response.status === 403) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);


export const employeesReplace = createAsyncThunk<string, {employeeId: number, fullName: string, posts: any, blocked: boolean}, { rejectValue:  any  }>(
    'employees/replace',
    async ({employeeId, fullName, posts, blocked}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/employees/${employeeId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName: fullName,
                    posts: posts,
                    blocked: blocked
                }),
            });

            if(response.status === 204) {
                const data: any = await response.json();
                return data
            } else if(response.status === 403) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);

export default  {employeesCreate,employeesRead,employeesFind,employeesReplace}