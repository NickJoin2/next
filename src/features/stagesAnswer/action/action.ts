import {createAsyncThunk} from "@reduxjs/toolkit";

export const projectStagesCreate = createAsyncThunk<string, {projectId: number, stageId: number, file: string}, { rejectValue:  any  }>(
    'projectStages/create',
    async ({projectId, stageId, file}, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/projects/${projectId}/stages/${stageId}/answer`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    file:file
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

export const projectsStagesAnswerReturn = createAsyncThunk<string, {projectId: number, stageId: number, studentId: number, remark: string, file: string}, { rejectValue:  any  }>(
    'projectStages/answerReturn',
    async ({projectId, stageId, studentId, remark, file }, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/projects/${projectId}/stages/${stageId}/answer/return/`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    student: studentId,
                    remark: remark,
                    file: file
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

export const projectsStagesAnswer = createAsyncThunk<string, {projectId: number, stageId: number, file: string}, { rejectValue:  any  }>(
    'projectStages/answer',
    async ({projectId, stageId, file }, thunkAPI) => {
        try {
            const response = await fetch(`https://99255933-2698-4faa-883f-c72f28e181ac.mock.pstmn.io/api/projects/${projectId}/stages/${stageId}/answer`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    file: file
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

export default {projectStagesCreate, projectsStagesAnswerReturn, projectsStagesAnswer}