import {createAsyncThunk} from "@reduxjs/toolkit";
import {GroupDTO} from "@/features/types";

export const groupCreate = createAsyncThunk<string, { name: string, specializationId: string }, { rejectValue: any }>(
    'group/create',
    async ({name, specializationId}, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Groups`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    specializationId: specializationId
                })
            });

            if (response.status === 201) {
                return 'Группа успешно создана'
            } else if(response.status === 400) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Запрос не прошел валидацию');
            } else if(response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет доступ на добавление группы');
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет доступ на добавление группы');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
);

export const groupRead = createAsyncThunk<GroupDTO[]>(
    'group/read',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Groups`, {
                method: 'GET',
            });

            if (response.status === 200) {
                const data: GroupDTO[] = await response.json();
                return data
            } else if (response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет прав на получение списка групп');
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Неизвестная ошибка');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
);


export const groupDelete = createAsyncThunk<string, { groupId: string }, { rejectValue: any }>(
    'group/delete',
    async ({groupId}, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Groups/${groupId}/`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                return 'Группа была удалена'
            } else if(response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имееет доступ на удаление студенческой группы');
            } else if(response.status === 404) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Группа не найдена');
            } else {
                return thunkAPI.rejectWithValue('Неизвестная ошибка');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
);

export const groupUpdate = createAsyncThunk<string, { groupId: string, name: string, specializationId: string }, {
    rejectValue: any
}>(
    'group/update',
    async ({groupId, name, specializationId}, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Groups/${groupId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    specializationId: specializationId
                })
            });

            if (response.status === 204) {
                return 'Группы успешно обновленна'
            } else if(response.status === 400) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error || 'Запрос не прошел валидацию');
            } else if(response.status === 403) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет доступ на изменение группы');
            } else if(response.status === 404) {
                const error: any = await response.json();
                return thunkAPI.rejectWithValue(error || 'Группа не найдена');
            }  else {
                return thunkAPI.rejectWithValue('Неизвестная ошибка');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);

export const groupFindRead = createAsyncThunk<GroupDTO, { groupId: string }, { rejectValue: any }>(
    'group/findRead',
    async ({groupId}, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Groups/${groupId}/`, {
                method: 'GET',
            });

            if (response.status === 200) {
                const data: GroupDTO = await response.json();
                return data
            } else if(response.status === 403) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет доступ на получение группы');
            } else if(response.status === 404) {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Группа не найдена');
            } else {
                return thunkAPI.rejectWithValue('Неизвестная ошибка');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error as any);
        }

    }
);


export const groupCreateStudent = createAsyncThunk<string, { firstname:string; middlename: string; lastname: string; groupId: string; }, { rejectValue: any }>(
    'group/createStudent',
    async ({firstname, middlename,lastname, groupId}, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Groups/${groupId}/Students/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: firstname,
                    middlename: middlename,
                    lastname: lastname,
                })
            });

            if (response.status === 201) {
                return 'Студент создан'
            } else if(response.status === 400)  {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Запрос не прошел валидацию');
            }  else if(response.status === 400)  {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Пользователь не имеет доступ на добавление студента');
            }  else {
                return thunkAPI.rejectWithValue('Не известная ошибка');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
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
};