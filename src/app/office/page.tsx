
import {Office} from "@/page/office";

import {Metadata} from "next";

export const metadata:Metadata = {
    title: 'Личный кабинет',
    description: '',
};

const breadCrumb = {
    '/': 'Главная',
    'office': 'Личный кабинет'
};

export default function Page() {
    return (
        <Office breadCrumb={breadCrumb} />
    )
}