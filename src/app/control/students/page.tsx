import React from "react";
import {GroupStudents} from "@/page/groupStudents";

import {Metadata} from "next";

export const metadata:Metadata = {
    title: 'Студенты - Группы',
    description: '',
};

const breadCrumb = {
    '/': 'Главная',
    '/control': 'Контроль',
    '/control/students': 'Студенты - Группы',
};



export default function page() {
    return (
        <GroupStudents breadCrumb={breadCrumb}/>
    )
}