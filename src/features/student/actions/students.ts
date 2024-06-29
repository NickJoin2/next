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
                return thunkAPI.rejectWithValue(validError || 'Пользователь не имеет прав на получение студента')
            } else if (response.status === 404) {
                const validError: Error = await response.json();
                return thunkAPI.rejectWithValue(validError || 'Студент не найден')
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Неизвестная ошибка');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const studentReplace = createAsyncThunk<string, {
    studentId: string,
    firstname: string,
    middlename: string,
    lastname: string,
    blocked: boolean,
    groupId: string
}, { rejectValue: any }>(
    'student/replace',
    async ({studentId,groupId, blocked, firstname, lastname, middlename}, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Students/${studentId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    groupId: groupId,
                    firstname: firstname,
                    lastname: lastname,
                    middlename: middlename,
                    blocked: blocked,
                })
            });

            if (response.status === 204) {
                // const data: EmployeeDTO = await response.json();
                // return data
                return 'Студент обновлен'
            } else if (response.status === 403) {
                const validError: Error = await response.json();
                return thunkAPI.rejectWithValue(validError || 'Пользователь не имеет прав на получение студента')
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
                return thunkAPI.rejectWithValue(errorValid || 'Пользователь не имеет прав на удаление студента')
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



export const groupReadStudent = createAsyncThunk<StudentDTO[], { groupId: string }, { rejectValue: any }>(
    'student/readStudent',
    async ({ groupId }, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Groups/${groupId}/Students/`, {
                method: 'GET',
            });

            if (response.status === 200) {
                const data: StudentDTO[] = await response.json();
                return data;
            } else if (response.status === 403) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет прав на получения студентов группы');
            } else {
                return thunkAPI.rejectWithValue('Неизвестная ошибка');
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
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
                return thunkAPI.rejectWithValue(validError || "Пользователь не имеет прав на перевод в выпускники");
            } else if (response.status === 404) {
                const validError = response.json()
                return thunkAPI.rejectWithValue(validError || "Cтудент не найден");
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const exportStudent = {
    studentFind, studentReplace, studentGraduate, studentDelete
}

export default exportStudent
