import React from "react";
import { Specializations } from "@/page/specializations";

import {Metadata} from "next";

export const metadata:Metadata = {
    title: 'Специализации',
    description: '',
};


export default function Page() {
    return (
        <Specializations/>
    );
}