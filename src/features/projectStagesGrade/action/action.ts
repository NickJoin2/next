import {createAsyncThunk} from "@reduxjs/toolkit";

export const projectsStagesAnswer = createAsyncThunk<string, {projectId: number, stageId: number, file: string}, { rejectValue:  any  }>(
    'projects/answer',
    async ({projectId, stageId, file}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/projects/${projectId}/stages/${stageId}/answer`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    file: file
                }),
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

export const projectsStagesGrade = createAsyncThunk<string, {projectId: number,stageId: number,studentId: number,grade: number}, { rejectValue:  any  }>(
    'projects/grade',
    async ({projectId, stageId,  studentId, grade}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/projects/${projectId}/stages/${stageId}/grade/`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    studentId: studentId,
                    grade: grade
                }),
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

export const projectReports = createAsyncThunk<string, {projectId: number}, { rejectValue:  any  }>(
    'projects/reports',
    async ({projectId}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/projects/${projectId}/reports/final-grades/`, {
                method: 'GET'
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

export const projectsReportsWork = createAsyncThunk<string, {projectId: number}, { rejectValue:  any  }>(
    'projects/work',
    async ({projectId}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/projects/${projectId}/reports/work-assingment/`, {
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

export default {projectsStagesAnswer, projectsStagesGrade, projectReports, projectsReportsWork}