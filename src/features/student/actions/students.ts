import {createAsyncThunk} from "@reduxjs/toolkit";
import {EmployeeDTO, StudentDTO, UpdateStudentDTO} from "@/features/types";

export const studentFind = createAsyncThunk<EmployeeDTO, { studentId: string }, { rejectValue: any }>(
    'student/find',
    async ({studentId}, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/employees/${studentId}`, {
                method: 'GET',
            });

            if (response.status === 200) {
                const data: EmployeeDTO = await response.json();
                return data
            } else if (response.status === 403) {
                const validError: Error = await response.json();
                return thunkAPI.rejectWithValue(validError || 'Пользователь не имеет доступ на получение студента')
            } else if (response.status === 404) {
                const validError: Error = await response.json();
                return thunkAPI.rejectWithValue(validError || 'Студент не найден')
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const studentReplace = createAsyncThunk<EmployeeDTO, {
    studentId: string,
    firstName: string,
    middleName: string,
    lastName: string,
    blocked: boolean,
}, { rejectValue: any }>(
    'student/replace',
    async ({studentId, blocked, firstName, lastName, middleName}, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/employees/${studentId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    middleName: middleName,
                    blocked: blocked,
                })
            });

            if (response.status === 200) {
                const data: EmployeeDTO = await response.json();
                return data
            } else if (response.status === 403) {
                const validError: Error = await response.json();
                return thunkAPI.rejectWithValue(validError || 'Пользователь не имеет доступ на получение студента')
            } else if (response.status === 404) {
                const validError: Error = await response.json();
                return thunkAPI.rejectWithValue(validError || 'Студент не найден')
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const studentDelete = createAsyncThunk<string, { id: string }, { rejectValue: any }>(
    'student/delete',
    async ({id}, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Students/${id}`, {
                method: 'DELETE',
            });


            if (response.status === 204) {
                return 'Студент удален'
            } else if (response.status === 403) {
                const errorValid = await response.json()
                return thunkAPI.rejectWithValue(errorValid || 'Пользователь не имеет доступ на удаление студента')
            } else if (response.status === 404) {
                const errorValid = await response.json()
                return thunkAPI.rejectWithValue(errorValid || 'Студент не найден')
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
);


export const studentGraduate = createAsyncThunk<string, { studentId: string }>(
    'employees/read',
    async (studentId, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/employees/${studentId}/Graduate/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },

            });

            if (response.status === 204) {
                return 'Статус студента обновлен'
            } else if (response.status === 403) {
                const validError = response.json()
                return thunkAPI.rejectWithValue(validError || "Пользователь не имеет доступ на перевод в выпускники");
            } else if (response.status === 404) {
                const validError = response.json()
                return thunkAPI.rejectWithValue(validError || "Cтудент не найден");
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error || "Что то пошло не так");
        }
    }
);


export default {studentFind}
