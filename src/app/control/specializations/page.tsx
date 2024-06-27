import React from "react";
import { Specializations } from "@/page/specializations";

import {Metadata} from "next";

export const metadata:Metadata = {
    title: 'Специализации',
    description: '',
};

const breadCrumb = {
    '/': 'Главная',
    '/control': 'Контроль',
    '/control/specializations': 'Специализации',
};


export default function Page() {
    return (
        <Specializations breadCrumb={breadCrumb} />
    );
}