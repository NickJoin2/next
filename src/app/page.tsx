import React from "react";
import {Map} from "@/page/map";
import {Metadata} from "next";

export const metadata:Metadata = {
    title: 'Карта',
    description: 'Карта сайта',
};


export default function page() {
    return (
        <Map/>
    )
}

