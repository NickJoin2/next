import {createAsyncThunk} from "@reduxjs/toolkit";
import {EmployeeDTO, Parametr, Person, UpdateStudentDTO} from "@/features/types";



export const studentReplaceCursach = createAsyncThunk<Person, {id:string | undefined, title:string; fio:string; prepodFio:string, link:string,level:string}, { rejectValue:  any  }>(
    'studentCursach/replace',
    async ({id, title, fio, prepodFio,link, level}, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/studentCursach/${id}`, {
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

            if(response.status === 200) {
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
export const studentCursachRead = createAsyncThunk<Person>(
    'studentCursach/read',
    async (_,thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/studentCursach/`, {
                method: 'GET',
            });

            if(response.status === 200) {
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



export const studentCursachCreate = createAsyncThunk<Person, {id:string, title:string,fio:string,prepodFio:string,level:string,link: string}>(
    'studentCursach/create',
    async ({id, title, fio, prepodFio, level, link},thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/studentCursach`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    title:title,
                    fio:fio,
                    prepodFio:prepodFio,
                    level:level,
                    link:link
                })
            });

            if(response.status === 200) {
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


export const studentCursachDelete = createAsyncThunk<Person, { studentId: string }, { rejectValue:  any  }>(
    'studentCursach/delete',
    async ({ studentId}, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/studentCursach/${studentId}/`, {
                method: 'DELETE',
            });

            if(response.status === 200) {
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

// export const studentGraduate = createAsyncThunk<StudentDTO, { studentId: Parametr,  }, { rejectValue:  any  }>(
//     'student/graduate',
//     async ({ studentId }, thunkAPI) => {
//         try {
//             const response = await fetch(`http://exam.uaviak.ru/api/Students/${studentId}/Graduate/`, {
//                 method: 'PATCH',
//             });
//
//             if(response.status === 200) {
//                 const data = await response.json();
//                 return data
//                 // return 'Cтатус студента обновлен'
//             } else  {
//                 const error: Error = await response.json();
//                 return thunkAPI.rejectWithValue(error);
//             }
//
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//
//     }
// );



// export const studentUpdate = createAsyncThunk<string, { groupId: UpdateStudentDTO; firstname: UpdateStudentDTO; middlename: UpdateStudentDTO; lastname: UpdateStudentDTO; blocked: UpdateStudentDTO; studentId: string|number; }, { rejectValue:  any  }>(
//     'student/update',
//     async ({studentId, groupId, firstname, middlename, lastname, blocked}, thunkAPI) => {
//         try {
//             const response = await fetch(`http://exam.uaviak.ru/api/Students/${studentId}/`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     groupId: groupId,
//                     firstname: firstname,
//                     middlename: middlename,
//                     lastname: lastname,
//                     blocked: blocked,
//                 })
//             });
//
//             if(response.status === 204) {
//                 return 'Студент был обновлен'
//             } else {
//                 const error: Error = await response.json();
//                 return thunkAPI.rejectWithValue(error);
//             }
//
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//
//     }
// );
//
// export const studentRead = createAsyncThunk<UpdateStudentDTO, { studentId: Parametr }, { rejectValue:  any  }>(
//     'student/read',
//     async ({ studentId}, thunkAPI) => {
//         try {
//             const response = await fetch(`http://exam.uaviak.ru/api/Students/${studentId}/`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//             });
//
//             if(response.status === 200) {
//                 const data: UpdateStudentDTO = await response.json();
//                 return data
//             } else {
//                 const error: Error = await response.json();
//                 return thunkAPI.rejectWithValue(error);
//             }
//
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//
//     }
// );
//
// export const studentDelete = createAsyncThunk<string, { studentId: Parametr }, { rejectValue:  any  }>(
//     'student/delete',
//     async ({ studentId}, thunkAPI) => {
//         try {
//             const response = await fetch(`http://exam.uaviak.ru/api/Students/${studentId}/`, {
//                 method: 'DELETE',
//             });
//
//             if(response.status === 204) {
//                 return 'Студент был удален'
//             } else {
//                 const error: Error = await response.json();
//                 return thunkAPI.rejectWithValue(error);
//             }
//
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//
//     }
// );
//
// export const studentGraduate = createAsyncThunk<string, { studentId: Parametr,  }, { rejectValue:  any  }>(
//     'student/graduate',
//     async ({ studentId }, thunkAPI) => {
//         try {
//             const response = await fetch(`http://exam.uaviak.ru/api/Students/${studentId}/Graduate/`, {
//                 method: 'PATCH',
//             });
//
//             if(response.status === 204) {
//                 return 'Cтатус студента обновлен'
//             } else  {
//                 const error: Error = await response.json();
//                 return thunkAPI.rejectWithValue(error);
//             }
//
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//
//     }
// );

export default {studentCursachRead, studentCursachDelete, studentReplaceCursach};