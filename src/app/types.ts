import React, {Dispatch} from "react";

export interface ButtonAuthProps {
    title?: string;
    width?: number;
    height?: number;
    anim?: boolean;
    margin?: string;
    hover?: boolean;
    img?: string;
    background?:string;
    setOpen?: Dispatch<React.SetStateAction<boolean>>;
}

// export interface Person {
//     id?: number;
//     fio?: string;
//     title?: string;
//     progress?: number;
//     level?: number;
// }

export interface TableHeadStudentCursovikProps {
    id: string;
    fio: string;
    prepodFio: string;
    link: string;
    level: string;
}

export interface TableWorkerPerson {
    id?: number;
    firstName?:string;
    lastName?: string;
    middleName?: string;
    posts?: Posts[];
}

export interface Posts {
    id: number;
    name: string;
}