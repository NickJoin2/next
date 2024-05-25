import {createAsyncThunk} from "@reduxjs/toolkit";

export const studentUpdate = createAsyncThunk<string, { studentId: number, fullName: string, id:number }, { rejectValue:  any  }>(
    'student/update',
    async ({studentId, fullName, id}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/students/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({studentId, fullName})
            });

            if(response.ok) {
                console.log(response.status)
                const data: any = await response.json();
                return data
            } else if (response.status === 400) {
                console.log(response.status)
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            } else if(response.status === 403) {
                console.log(response.status)
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            } else if(response.status === 404) {
                console.log(response.status)
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);

export const studentRead = createAsyncThunk<string, { studentId:number }, { rejectValue:  any  }>(
    'student/read',
    async ({ studentId}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/students/${studentId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if(response.ok) {
                const data: any = await response.json();
                return data
            } else if(response.status === 403) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            } else if(response.status === 404) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            } else if(response.status === 409) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);

export const studentReload = createAsyncThunk<string, { graduate: boolean }, { rejectValue:  any  }>(
    'student/reload',
    async ({ graduate}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/students/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    graduate: graduate,
                })
            });

            if(response.ok) {
                const data: any = await response.json();
                return data
            } else if(response.status === 403) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            } else if(response.status === 404) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            } else if(response.status === 409) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);

export default {studentUpdate, studentRead, studentReload};