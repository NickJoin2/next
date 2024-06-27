import {Control} from "@/page/control";
import React from "react";

import {Metadata} from "next";

export const metadata:Metadata = {
    title: 'Сотрудники',
    description: '',
};

 const breadCrumb = {
    '/': 'Главная',
    '/control': 'Контроль',
};



export default function page() {
    return (
        <Control breadCrumb={breadCrumb}/>
    )
}