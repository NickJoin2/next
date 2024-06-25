import {createAsyncThunk} from "@reduxjs/toolkit";
import {EmployeeDTO, Parametr, Person, UpdateStudentDTO} from "@/features/types";


export const studentReplaceDiplom = createAsyncThunk<Person, {
    id: string | undefined,
    title: string;
    fio: string;
    prepodFio: string,
    link: string,
    level: string
}, { rejectValue: any }>(
    'studentDiplom/replace',
    async ({id, title, fio, prepodFio, link, level}, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/studentDiplom/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    fio: fio,
                    prepodFio: prepodFio,
                    link: link,
                    level: level
                }),
            });

            if (response.status === 200) {
                const data = await response.json()
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
export const studentReadDiplom = createAsyncThunk<Person>(
    'studentDiplom/read',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/studentDiplom/`, {
                method: 'GET',
            });

            if (response.status === 200) {
                const data: Person = await response.json();
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

export const studentCreateDiplom = createAsyncThunk<Person, {
    id: string,
    title: string,
    fio: string,
    prepodFio: string,
    level: string,
    link: string
}>(
    'studentDiplom/create',
    async ({id, title, fio, prepodFio, level, link}, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/studentDiplom/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    title: title,
                    fio: fio,
                    prepodFio: prepodFio,
                    level: level,
                    link: link
                })
            });

            if (response.status === 200) {
                const data: Person = await response.json();
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


export const studentDeleteDiplom = createAsyncThunk<Person, { studentId: string }, { rejectValue: any }>(
    'studentDiplom/delete',
    async ({studentId}, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/studentDiplom/${studentId}/`, {
                method: 'DELETE',
            });

            if (response.status === 200) {
                // return 'Студент был удален'
                const data = await response.json();
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


export default {studentReadDiplom, studentDeleteDiplom, studentReplaceDiplom, studentCreateDiplom};