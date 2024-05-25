import {createAsyncThunk} from "@reduxjs/toolkit";

export const groupCreate = createAsyncThunk<string, {name: string, specializationId: number }, { rejectValue:  any  }>(
    'group/create',
    async ({name, specializationId}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/Groups`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    specializationId: specializationId
                })
            });

            if(response.status === 201) {
                const data: any = await response.json();
                return data
            } else if(response.status === 400) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            }  else if(response.status === 403) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);


export const groupUpdate = createAsyncThunk<string, { groupId:number, name:string, specializationId:number }, { rejectValue:  any  }>(
    'group/update',
    async ({ groupId, name, specializationId}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/groups/${groupId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    specializationId: specializationId
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


export const groupCreateStudent = createAsyncThunk<string, { fullName:number, groupId:number  }, { rejectValue:  any  }>(
    'group/createStudent',
    async ({ fullName, groupId}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/groups/${groupId}/students/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName:fullName,
                })
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


export const groupRead = createAsyncThunk<any, { rejectValue:  any  }>(
    'group/read',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/groups/`, {
                method: 'GET',
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


export const groupFindRead = createAsyncThunk<string, {groupId: number}, { rejectValue:  any  }>(
    'group/findRead',
    async ({groupId}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/Groups/${groupId}`, {
                method: 'GET',
            });

            if(response.status === 200) {
                const data: any = await response.json();
                return data
            } else if(response.status === 404) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);

export const groupDelete = createAsyncThunk<string, { groupId: number }, { rejectValue:  any  }>(
    'group/delete',
    async ({ groupId }, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/Groups/${groupId}`, {
                method: 'DELETE',
            });

            if(response.status === 204) {
                const data: any = await response.json();
                return data
            } else if(response.status === 403) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            }  else if(response.status === 404) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);


export const groupReadStudent = createAsyncThunk<string, { groupId: number }, { rejectValue:  any  }>(
    'group/readStudent',
    async ({ groupId }, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/Groups/${groupId}/students `, {
                method: 'DELETE',
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

export default {
    groupCreate,
    groupUpdate,
    groupCreateStudent,
    groupRead,
    groupFindRead,
    groupDelete,
    groupReadStudent
};