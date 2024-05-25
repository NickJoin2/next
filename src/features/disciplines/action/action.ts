import {createAsyncThunk} from "@reduxjs/toolkit";

export const disciplinesCreate = createAsyncThunk<string, {name: string}, { rejectValue:  any  }>(
    'disciplines/create',
    async ({name}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/disciplines/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name
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


export const disciplinesRead = createAsyncThunk<any,  { rejectValue:  any  }>(
    'disciplines/read',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/disciplines/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if(response.status === 200) {
                const data: any = await response.json();
                return data
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);


export const disciplinesUpdate = createAsyncThunk<string, {disciplinesId: number, name: string}, { rejectValue:  any  }>(
    'disciplines/update',
    async ({disciplinesId, name}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/disciplines/${disciplinesId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                })
            });

            if(response.status === 201) {
                const data: any = await response.json();
                return data
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);

export const disciplinesAssign = createAsyncThunk<string, {disciplinesId: number, employeeId: number}, { rejectValue:  any  }>(
    'disciplines/assign',
    async ({disciplinesId, employeeId}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/assign/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    disciplinesId: disciplinesId,
                    employeeId: employeeId
                })
            });

            if(response.status === 200) {
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
)

export default {disciplinesCreate,disciplinesRead,disciplinesUpdate,disciplinesAssign}