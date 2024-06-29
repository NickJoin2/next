import React from "react";
import {Workers} from "@/page/workers";

import {Metadata} from "next";

export const metadata:Metadata = {
    title: 'Сотрудники',
    description: '',
};

export default function page() {
    return (
        <Workers/>
    )
}