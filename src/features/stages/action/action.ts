import {createAsyncThunk} from "@reduxjs/toolkit";
// import {jwtDecode} from "jwt-decode";

export const projectStages = createAsyncThunk<string, {projectId: number, name: string, description: string, deadline: string, pinnedFile: string }, { rejectValue:  any  }>(
    'stages/update',
    async ({projectId, name,description, deadline, pinnedFile}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/projects/${projectId}/stages/`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    deadline: deadline,
                    pinnedFile: pinnedFile
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

export const projectStagesReplace = createAsyncThunk<string, {projectId: number, name: string, description: string, deadline: string, pinnedFile: string }, { rejectValue:  any  }>(
    'stages/replace',
    async ({projectId, name,description, deadline, pinnedFile}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/projects/${projectId}/stages`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    deadline: deadline,
                    pinnedFile: pinnedFile
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

export const projectStagesRead = createAsyncThunk<string, {projectId: number}, { rejectValue:  any  }>(
    'stages/read',
    async ({projectId}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/projects/${projectId}/stages`, {
                method: 'GET'
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

export const projectStagesReadComplete = createAsyncThunk<string, {projectId: number, stageId: number,}, { rejectValue:  any  }>(
    'stages/readComplete',
    async ({projectId, stageId}, thunkAPI) => {
        // не придумал как использовать ------------------------------------------------------------
        // const token:any = localStorage.getItem('token');
        // const data:any = jwtDecode(token);
        // const role = data.role
        // не придумал как использовать ------------------------------------------------------------

        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/projects/${projectId}/stages/${stageId}`, {
                method: 'GET'
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

export default {projectStages, projectStagesReplace, projectStagesRead, projectStagesReadComplete};