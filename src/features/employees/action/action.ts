import {createAsyncThunk} from "@reduxjs/toolkit";
import {CreateEmployeeCommand, EmployeeDTO} from "@/features/types";
import {Posts} from "@/app/types";


export const employeesCreate = createAsyncThunk<
    string,
    {
        firstName: string;
        middleName: string;
        lastName: string;
        roles: number[];
    },
    { rejectValue: any } // Ошибка - строка
>(
    'employees/create',
    async ({ firstName, middleName, lastName, roles }, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Employees/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName:firstName,
                    lastName:lastName,
                    middleName:middleName,
                    roles:roles,
                }),
            });

            if (response.status === 201) {
                return 'Пользователь создан';
            } else if (response.status === 400) {
                const validError = await response.json();
                return thunkAPI.rejectWithValue(validError || 'Запрос не прошел валидацию');
            } else if (response.status === 403) {
                return thunkAPI.rejectWithValue('Пользователь не имеет прав на добавление сотрудников');
            }else {
                const error = await response.json();
                return thunkAPI.rejectWithValue(error.message || 'Неизвестная ошибка');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const employeesRead = createAsyncThunk<EmployeeDTO>(
    'employees/read',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Employees`, {
                method: 'GET',
            });

            if (response.status === 200) {
                const data =  await response.json()
                return data
            } else if (response.status === 403) {
                return thunkAPI.rejectWithValue("Пользователь не имеет прав на получение списка сотрудников");
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const employeesReplace = createAsyncThunk<string, {
    id: string,
    firstName: string;
    lastName: string;
    middleName: string,
}, { rejectValue: any }>(
    'employees/replace',
    async ({id, firstName, middleName, lastName}, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Employees/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                }),
            });

            if (response.status === 204) {
                return "Пользователь обновлен"
            } else if (response.status === 400) {
                const errorValid = response.json()
                return thunkAPI.rejectWithValue(errorValid || 'Запрос не прошел валидацию')
            } else if (response.status === 403) {
                const errorValid = response.json()
                return thunkAPI.rejectWithValue(errorValid || 'Пользователь не имеет прав на изменение сотрудника')
            }  else if (response.status === 404) {
                const errorValid = response.json()
                return thunkAPI.rejectWithValue(errorValid || 'Пользователь не найден')
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error || 'Неизвестная ошибка');
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
);

export const employeesFind = createAsyncThunk<EmployeeDTO, {employeeId: number}, { rejectValue:  any  }>(
    'employees/find',
    async ({employeeId}, thunkAPI) => {
        try {
            const response = await fetch(`http://exam.uaviak.ru/api/Employees/${employeeId}/`, {
                method: 'GET',
            });

            if(response.status === 200) {
                const data: EmployeeDTO = await response.json();
                return data
            } else if(response.status === 403) {
                const validError:Error = await response.json();
                return thunkAPI.rejectWithValue(validError || 'Пользователь не имеет доступ на получение сотрудника')
            } else if(response.status === 404) {
                const validError:Error = await response.json();
                return thunkAPI.rejectWithValue(validError || 'Сотрудник не найден')
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
);


export const employeesDelete = createAsyncThunk<string, { id: string }, { rejectValue: any }>(
    'employees/delete',
    async ({id}, thunkAPI) => {
        try {
            const response = await fetch(`http://cms.uaviak.ru/api/Employees/${id}`, {
            // const response = await fetch(`http://localhost:3000/employees/${id}`, {
                method: 'DELETE',
            });


            if (response.status === 204) {
                return 'Сотрудник удален'
            } else if (response.status === 403) {
                const errorValid = response.json()
                return thunkAPI.rejectWithValue(errorValid || 'Пользователь не имеет прав на уделение сотрудника')
            }  else if (response.status === 404) {
                const errorValid = response.json()
                return thunkAPI.rejectWithValue(errorValid || 'Сотрудник не найден')
            } else {
                const error: Error = await response.json();
                return thunkAPI.rejectWithValue(error);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
);

const exportEmployees = {
    employeesCreate, employeesRead, employeesReplace, employeesDelete
}

export default exportEmployees
