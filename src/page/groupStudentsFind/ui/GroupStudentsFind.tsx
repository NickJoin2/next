import React, {useState} from 'react';

import '@/widgets/specializationCard/ui/styles.scss'

import NoRecords from "@/shared/ui/NoRecords";
import {StudentTable} from "@/widgets/studentTable";

import {RootState, useAppSelector} from "@/app/store/appStore";
import {useRouter} from "next/navigation";


const GroupCard = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<string>('');

    const group = useAppSelector((state: RootState) => state.group.groupCard)

    const router = useRouter();

    const handleOpen = (groupId: string) => {
        setOpen(true)
        setSelectedItemId(groupId)
        router.push(`/control/students/${groupId}`)
    }

    const  theadObj = ['Имя', 'Фамилия', 'Отчество', 'Выпускник', 'Блокировка']

    return (
        <>
                <ul className="specializations__list">
                    {group && group.length !== 0 ? (
                        group.map(item => (
                            <li className="specializations__item" key={item.id} onClick={() => handleOpen(item.id)}>
                                <p className="specializations__title">{item.name}</p>
                            </li>
                        ))
                    ) : (
                        <NoRecords title={'Нет групп'}/>
                    )}

                    {
                      open  && <StudentTable theadObj={theadObj}/>
                    }

                </ul>
        </>
    );
};

export default GroupCard;