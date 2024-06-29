import React from "react";
import {Groups} from "@/page/groups";

import {Metadata} from "next";

export const metadata:Metadata = {
    title: 'Группы',
    description: '',
};


export default function page() {
    return (
        <Groups/>
    )
}