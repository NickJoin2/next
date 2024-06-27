import React from "react";
import {Workers} from "@/page/workers";

import {Metadata} from "next";
import breadCrumbs from "@/features/breadCrumbs/ui/BreadCrumbs";

export const metadata:Metadata = {
    title: 'Сотрудники',
    description: '',
};

const breadCrumb = {
    '/': 'Главная',
    '/control': 'Контроль',
    '/control/workers': 'Сотрудники',
};


export default function page() {
    return (
        <Workers breadCrumb={breadCrumb}/>
    )
}