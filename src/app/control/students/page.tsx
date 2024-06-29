import React from "react";
import {GroupStudents} from "@/page/groupStudents";

import {Metadata} from "next";

export const metadata:Metadata = {
    title: 'Студенты - Группы',
    description: '',
};





export default function page() {
    return (
        <GroupStudents/>
    )
}