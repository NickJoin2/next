export interface CreateDisciplineCommand {
    name: string
}

export interface Error {
    "type": "string",
    "title": "string",
    "status": "number",
    "detail": "string",
    "instance": "string",
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
}

export interface CreateEmployeeCommand {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    posts: Posts[]
}

export interface Posts {
    id: number;
    name: string;
}


export interface CreateGroupDTO {
    name: string;
    specializationId: string;
}

export interface CreateSpecializationCommand {
    name: string;
}

export interface CreateStudentDTO {
    id: string;
    firstname: string;
    middlename: string;
    lastname: string;
    posts: PostDTO[]
}

export interface DisciplineAssignmentDTO {
    disciplineId: string|number
    employeeId: string;
}

export interface DisciplineDTO {
    id: string;
    name: string;
}

export interface EmployeeDTO {
    id:string;
    firstName: string;
    lastName: string;
    middleName: string;
    blocked: boolean;
    posts: PostDTO[]
}

export interface Person {
    id?: string;
    fio?: string;
    title?: string;
    prepodFio?: string;
    link?: string;
    level?: string;
}

export interface GroupDTO {
    id: string;
    name: string;
    specializationId: string;
}

export interface PostDTO {
    id: number;
    name: string;
}

export interface ProblemDetails {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
}

export interface SpecializationDTO {
    id: string;
    name: string;
}

// export interface StudentDTO {
//     id: string;
//     firstName: string;
//     middleName: string;
//     lastName: string;
//     blocked: boolean;
// }

export interface UpdateDisciplineDTO {
    name: string;
    disciplinesId: string;
}

export interface UpdateEmployeeDTO {
    firstName: string;
    lastName: string;
    middleName: string;
}

export interface Parametr {
    disciplinesId: string|number,
    studentId: string|number
}

export interface UpdateGroupDTO {
    name: string;
    specializationId: string;
}

export interface UpdateSpecializationDTO {
    name: string;
}

export interface UpdateStudentDTO {
    groupId: string;
    firstname: string;
    middlename: string;
    lastname: string;
    graduated: boolean,
    blocked: boolean;
}

export interface StudentDTO {
    "id": string,
    "firstName": string,
    "middleName": string,
    "lastName": string,
    "graduated": boolean,
    "blocked": boolean
}

