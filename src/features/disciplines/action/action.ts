import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    CreateDisciplineCommand,
    Error,
    DisciplineDTO,
    UpdateDisciplineDTO,
    Parametr, DisciplineAssignmentDTO
} from "@/features/types";

export const disciplinesCreate = createAsyncThunk<string, { name: string }, { rejectValue: any }>(
    'disciplines/create',
    async ({ name }, thunkAPI) => {
        try {
            const response = await fetch(`http://exam.uaviak.ru/api/Disciplines/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name
                }),
            });

            if (response.status === 204) {
                return 'Дисциплина успешно создана'
            } else if(response.status === 400) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Запрос не прошел валидацию');
            } else if(response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет прав на добавление дисциплины');
            }
            else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const disciplinesRead = createAsyncThunk<DisciplineDTO[], { rejectValue: any }>(
    'disciplines/read',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`http://exam.uaviak.ru/api/Disciplines/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (response.status === 204) {
                const data:DisciplineDTO[] = await response.json();
                return data
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const disciplinesUpdate = createAsyncThunk<string, { disciplinesId: string, name: string }, { rejectValue: any }>(
    'disciplines/update',
    async ({ disciplinesId, name }, thunkAPI) => {
        try {
            const response = await fetch(`http://exam.uaviak.ru/api/Disciplines/${disciplinesId}/`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                })
            });

            if (response.status === 204) {
               return 'Дисциплина успешно обновлена'
            } else if(response.status === 400) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Запрос не прошел валидацию');
            } else if(response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет прав на изменение дисциплины');
            }
            else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const disciplinesDelete = createAsyncThunk<string, {disciplinesId: Parametr}, { rejectValue:  any  }>(
    'disciplines/delete',
    async ({disciplinesId}, thunkAPI) => {

        try {
            const response = await fetch(`http://exam.uaviak.ru/api/Disciplines/${disciplinesId}/`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                return 'Дисциплина успешно удалена'
            } else if(response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет доступ на удаление дисциплины');
            } else if(response.status === 404) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Дисциплина не найдена');
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
);

export const disciplinesAssign = createAsyncThunk<string, {disciplinesId: DisciplineAssignmentDTO, employeeId: DisciplineAssignmentDTO}, { rejectValue:  any  }>(
    'disciplines/assign',
    async ({disciplinesId, employeeId}, thunkAPI) => {
        try {
            const response = await fetch(`http://exam.uaviak.ru/api/Disciplines/unassign/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    disciplinesId: disciplinesId,
                    employeeId: employeeId
                })
            });

            if(response.status === 204) {
                return 'Дисциплина успешно назначена'
            } else if (response.status === 400) {
                return 'Преподаватель уже привязан к данной дисциплине'
            } else if(response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет доступ на назначение дисциплины преподавателю');
            } else if(response.status === 404) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Дисциплина или преподаватель не найден');
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
)

export const disciplinesUnassign = createAsyncThunk<string, {disciplinesId: DisciplineAssignmentDTO, employeeId: DisciplineAssignmentDTO}, { rejectValue:  any  }>(
    'disciplines/unassign',
    async ({disciplinesId, employeeId}, thunkAPI) => {
        try {
            const response = await fetch(`http://exam.uaviak.ru/api/Disciplines/unassign/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    disciplinesId: disciplinesId,
                    employeeId: employeeId
                })
            });

            if(response.status === 204) {
                return 'Дисциплина успешно снята'
            } else if(response.status === 400) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Сотрудник не привязан к данной дисциплине');
            } else if(response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет доступ на снятие дисциплины преподавателю');
            } else if(response.status === 404) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Дисциплина или преподаватель не найдены');
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
)

export default {disciplinesCreate,disciplinesRead,disciplinesUpdate,disciplinesAssign}