import React from "react";
import {Disciplines} from "@/page/disciplines";

import {Metadata} from "next";

export const metadata:Metadata = {
    title: 'Дисциплины',
    description: '',
};


export default function page() {
    return (
        <Disciplines/>
    )
}