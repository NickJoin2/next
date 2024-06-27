import React from "react";
import {Disciplines} from "@/page/disciplines";

import {Metadata} from "next";

export const metadata:Metadata = {
    title: 'Дисциплины',
    description: '',
};


const breadCrumb = {
    '/': 'Главная',
    '/control': 'Контроль',
    '/control/disciplines': 'Дисциплины',
};


export default function page() {
    return (
        <Disciplines breadCrumb={breadCrumb}/>
    )
}