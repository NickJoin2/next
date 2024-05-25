import {createAsyncThunk} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

export const projectCreate = createAsyncThunk<string, {name: string, subjectArea: string, projectType: string, disciplinesId: number}, { rejectValue:  any  }>(
    'person/save',
    async ({name, subjectArea, projectType, disciplinesId}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/projects/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    subjectArea: subjectArea,
                    projectType: projectType,
                    disciplinesId: disciplinesId
                }),
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
);

export const projectRead = createAsyncThunk<string, {}, { rejectValue:  any  }>(
    'person/save',
    async ({}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/projects/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
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

export const projectFind = createAsyncThunk<string, {projectId: number}, { rejectValue:  any  }>(
    'person/save',
    async ({projectId}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/projects/${projectId}`, {
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

export const projectComplete = createAsyncThunk<string, {projectId: number}, { rejectValue:  any  }>(
    'person/save',
    async ({projectId}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/projects/${projectId}/complete/`, {
                method: 'PATCH',
            });

            if(response.status === 201) {
                const data: any = await response.json();
                return data
            } else if(response.status === 400) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error as any);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);

export const projectUpdate = createAsyncThunk<string, {projectId: number, name: string, subjectArea: string, projectType: string,projectTypeId: number, disciplineName: string, disciplineId: number }, { rejectValue:  any  }>(
    'person/save',
    async ({projectId, name,subjectArea, projectType,projectTypeId, disciplineName, disciplineId}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/projects/${projectId}/`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    subjectArea: subjectArea,
                    projectType: projectType,
                    projectTypeId: projectTypeId,
                    disciplineName: disciplineName,
                    disciplineId: disciplineId
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


export default {projectCreate, projectRead, projectFind, projectComplete, projectUpdate}