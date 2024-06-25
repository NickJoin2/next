import React, {useState} from 'react';
import '@/widgets/specializationCard/ui/styles.scss'

import NoRecords from "@/shared/ui/NoRecords";
import editImg from "@/shared/image/table-button/edit.svg";
import deleteImg from "@/shared/image/table-button/delete.svg";
import addUser from "@/shared/image/table-button/userAdd.svg";

import AssentModal from "@/widgets/modal/assent/ui/AssentModal";
import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {setAssentModal} from "@/features/other/slice/other";
import Image from "next/image";
import GroupModalCreate from "@/widgets/groupModalCreate/ui/GroupModalCreate";
import {groupDelete} from "@/features/group/action/action";
import {setGroup} from "@/features/group/slice/group";
import GroupStudentAddModal from "@/widgets/groupStudentAddModal/ui/GroupStudentAddModal";
import StudentTable from "@/widgets/studentTable/ui/StudentTable";
import {useRouter} from "next/navigation";



const GroupCard = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<string>(null);
    const assentModal = useAppSelector((state: RootState) => state.other.assentModal);
    const [confirm, setConfirm] = useState<string>('')
    const [studentModalAdd, setStudentModalAdd] = useState<boolean>(false);

    const group = useAppSelector((state: RootState) => state.group.groupCard)

    const dispatch = useAppDispatch();
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
                      open  && <StudentTable theadObj={theadObj} selectedItem={selectedItemId}/>
                    }

                </ul>
        </>
    );
};

export default GroupCard;