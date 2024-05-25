import {createAsyncThunk} from "@reduxjs/toolkit";

export const specializationsRead = createAsyncThunk<any, { rejectValue:  any  }>(
    'specializations/read',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/specializations`, {
                method: 'GET',
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


export const specializationsCreate = createAsyncThunk<string, {name: string, code: string}, { rejectValue:  any  }>(
    'specializations/create',
    async ({name, code}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/specializations`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": name,
                    code: code,
                })
            });

            if(response.status === 201) {
                const data: any = await response.json();
                return data
            } else if(response.status === 400) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            } else if(response.status === 403) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);


export const specializationsUpdate = createAsyncThunk<string, {specializationId: number, name: string, code: string}, { rejectValue:  any  }>(
    'specializations/update',
    async ({specializationId, name, code}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/specializations/${specializationId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    code: code,
                })
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


export const specializationsDelete = createAsyncThunk<string, {specializationId: number}, { rejectValue:  any  }>(
    'specializations/delete',
    async ({specializationId}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/specializations/${specializationId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if(response.status === 204) {
                const data: any = await response.json();
                return data
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);

export default {specializationsRead, specializationsCreate, specializationsUpdate, specializationsDelete}