import {createAsyncThunk} from "@reduxjs/toolkit";
import {CreateSpecializationCommand, SpecializationDTO, UpdateSpecializationDTO} from "@/features/types";


export const specializationsRead = createAsyncThunk<SpecializationDTO[]>(
    'specializations/read',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Specializations`, {
                method: 'GET',
            });

            if(response.status === 200) {
                const data: SpecializationDTO[] = await response.json();
                return data
            } else if (response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет прав на получение специализации');
            } else {
                return thunkAPI.rejectWithValue('Неизвестная ошибка');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
);


export const specializationsCreate = createAsyncThunk<string, {name: string }, { rejectValue:  any  }>(
    'specializations/create',
    async ({name}, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Specializations`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": name,
                })
            });

            if(response.status === 201) {
                return "Специализация успешно создана"
            } else if(response.status === 400) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Запрос не прошел валидацию');
            } else if(response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет прав на добавление специализации');
            } else {
                return thunkAPI.rejectWithValue('Не известный статус ошибки');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
);


export const specializationsUpdate = createAsyncThunk<string, { specializationId: string; name:  string}, { rejectValue:  any  }>(
    'specializations/update',
    async ({specializationId, name}, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Specializations/${specializationId}/`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                })
            });

            if(response.status === 204) {
                return "Специализация успешно обновленна"
            } else if(response.status === 400) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Запрос не прошел валидацию');
            } else if(response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет доступа на изменение специализации');
            } else {
                return thunkAPI.rejectWithValue('Неизвестная ошибка');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
);


export const specializationsDelete = createAsyncThunk<string, {specializationId: number}, { rejectValue:  any  }>(
    'specializations/delete',
    async ({specializationId}, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Specializations/${specializationId}/`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if(response.status === 204) {
                return 'Специализация удалена'
            } else if(response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет доступа на удаление специализации');
            } else if(response.status === 404) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Специализация не найдена');
            } else {
                return thunkAPI.rejectWithValue('Неизвестная ошибка');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
);

export default {specializationsRead, specializationsCreate, specializationsUpdate, specializationsDelete}