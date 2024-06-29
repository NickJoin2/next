import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    Error,
    DisciplineDTO,
    DisciplineAssignmentDTO
} from "@/features/types";

export const disciplinesCreate = createAsyncThunk<string, { name: string }, { rejectValue: any }>(
    'disciplines/create',
    async ({ name }, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Disciplines`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name
                }),
            });

            if (response.status === 201) {
                return 'Дисциплина создана'
            } else if(response.status === 400) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Запрос не прошел валидацию');
            } else if(response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет прав на добавление дисциплины');
            }
            else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Неизвестная ошибка');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const disciplinesRead = createAsyncThunk<DisciplineDTO[]>(
    'disciplines/read',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Disciplines`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (response.status === 200) {
                const data:DisciplineDTO[] = await response.json();
                return data
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Неизвестная ошибка');
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
            const response = await fetch(`http://cms.uaviak.ru/api/Disciplines/${disciplinesId}/`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                })
            });

            if (response.status === 204) {
               return 'Дисциплина обновлена'
            } else if(response.status === 400) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Запрос не прошел валидацию');
            } else if(response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет прав на изменение дисциплины');
            }
            else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Неизвестная ошибка');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const disciplinesDelete = createAsyncThunk<string, {disciplinesId: string}, { rejectValue:  any  }>(
    'disciplines/delete',
    async ({disciplinesId}, thunkAPI) => {

        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Disciplines/${disciplinesId}/`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                return 'Дисциплина удалена'
            } else if(response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет прав на удаление дисциплины');
            } else if(response.status === 404) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Дисциплина не найдена');
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Неизвестная ошибка');
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
            const response = await fetch(`http://cms.uaviak.ru/api/Disciplines/assign`, {
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
                return 'Дисциплина назначена'
            } else if (response.status === 400) {
                return 'Преподаватель уже привязан к данной дисциплине'
            } else if(response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет прав на назначение дисциплины преподавателю');
            } else if(response.status === 404) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Дисциплина или преподаватель не найден');
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Неизвестная ошибка');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
)

export const disciplinesUnassign = createAsyncThunk<string, {disciplinesId: string, employeeId: string}, { rejectValue:  any  }>(
    'disciplines/unassign',
    async ({disciplinesId, employeeId}, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Disciplines/unassign/`, {
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
                return 'Дисциплина снята'
            } else if(response.status === 400) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Сотрудник не привязан к данной дисциплине');
            } else if(response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет прав на снятие дисциплины преподавателю');
            } else if(response.status === 404) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Дисциплина или преподаватель не найдены');
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Неизвестная ошибка');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
)

const exportDisciplines = {
    disciplinesCreate,disciplinesRead,disciplinesUpdate,disciplinesAssign
}

export default exportDisciplines