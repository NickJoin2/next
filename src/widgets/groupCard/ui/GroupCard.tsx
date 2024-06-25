import React, {useEffect, useState} from 'react';
import '@/widgets/specializationCard/ui/styles.scss'

import NoRecords from "@/shared/ui/NoRecords";
import editImg from "@/shared/image/table-button/edit.svg";
import deleteImg from "@/shared/image/table-button/delete.svg";
import addUser from "@/shared/image/table-button/userAdd.svg";

import AssentModal from "@/widgets/modal/assent/ui/AssentModal";
import {specializationsDelete} from "@/features/specializations/action/action";
import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {setAssentModal} from "@/features/other/slice/other";
import {setCardSpecializations} from "@/features/specializations/slice/specialization";
import Image from "next/image";
import SpecializationsModalCreate from "@/widgets/specializationsModalCreate/ui/SpecializationsModalCreate";
import {SpecializationDTO} from "@/features/types";
import GroupModalCreate from "@/widgets/groupModalCreate/ui/GroupModalCreate";
import {groupDelete} from "@/features/group/action/action";
import {setGroup} from "@/features/group/slice/group";
import GroupStudentAddModal from "@/widgets/groupStudentAddModal/ui/GroupStudentAddModal";



const GroupCard = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const assentModal = useAppSelector((state: RootState) => state.other.assentModal);
    const [confirm, setConfirm] = useState<string>('')
    const [studentModalAdd, setStudentModalAdd] = useState<boolean>(false);
    // const [dataTable, setDataTable] = useState<SpecializationDTO[]>([]);

    const group = useAppSelector((state: RootState) => state.group.groupCard)

    const dispatch = useAppDispatch();


    const handleEdit = (id: string) => {
        setOpen(true);

        const item:any = group.find(item => item.id === id);
        setSelectedItemId(item);
    }

    const handleDelete = (e: React.FormEvent, id: string) => {
        e.preventDefault()
        dispatch(setAssentModal(true))
        setConfirm(id)
    };

    const submitGreen = async(e: React.FormEvent) => {
        e.preventDefault();

        const groupId: string = confirm

        dispatch(groupDelete({groupId}))
        dispatch(setGroup(group.filter((item) => item.id !== groupId)))
        dispatch(setAssentModal(false))
    };

    const submitRed = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(setAssentModal(false))
    }

    const handleAddUser = (id: string) => {
        setSelectedItemId(id)
        setStudentModalAdd(true)
    }


    return (
        <>
            <div className="container">
                <ul className="specializations__list">

                    {group && group.length !== 0 ? (
                        group.map(item => (
                            <li className="specializations__item" key={item.id}>
                                <p className="specializations__title">{item.name}</p>
                                <div className="specializations__button">
                                    <Image onClick={() => handleAddUser(item.id)} width={22} src={addUser} alt="addUser"/>
                                    <Image onClick={(e) => handleDelete(e, item.id)} src={deleteImg} alt='delete'/>
                                    <Image onClick={() => handleEdit(item.id)} src={editImg} alt="edit"/>
                                </div>
                            </li>
                        ))
                    ) : (
                        <NoRecords title={'Нет групп'}/>
                    )}

                    {
                        open && <GroupModalCreate setOpen={setOpen} selectedItem={selectedItemId} />
                    }

                    {
                        assentModal && <AssentModal title={'Вы уверены что хотите удалить группу?'}
                                                    submitGreen={submitGreen} submitRed={submitRed}/>
                    }

                    {
                        studentModalAdd && <GroupStudentAddModal setOpen={setStudentModalAdd} selectedItem={selectedItemId}/>
                    }

                </ul>
            </div>
        </>
    );
};

export default GroupCard;