import React from "react";
import {Groups} from "@/page/groups";

import {Metadata} from "next";

export const metadata:Metadata = {
    title: 'Группы',
    description: '',
};


const breadCrumb = {
    '/': 'Главная',
    '/control': 'Контроль',
    '/control/groups': 'Группы',
};



export default function page() {
    return (
        <Groups breadCrumb={breadCrumb}/>
    )
}