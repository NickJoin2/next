import React, {useState} from 'react';
import Image from "next/image";

import '@/widgets/specializationCard/ui/styles.scss'

import NoRecords from "@/shared/ui/NoRecords";
import {AssentModal} from "@/widgets/assentModal";
import {GroupCreateModal} from "@/widgets/groupModalCreate";
import {GroupStudentAddModal} from "@/widgets/groupStudentAddModal";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {GroupDTO} from "@/features/types";
import {setAssentModal} from "@/features/other/slice/other";
import {groupDelete} from "@/features/group/action/action";
import {setGroup} from "@/features/group/slice/group";

import editImg from "@/shared/image/table-button/edit.svg";
import deleteImg from "@/shared/image/table-button/delete.svg";
import addUser from "@/shared/image/table-button/userAdd.svg";


const GroupCard = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<GroupDTO | null | string>(null);
    const assentModal = useAppSelector((state: RootState) => state.other.assentModal);
    const [groupId, setGroupId] = useState<string>('')
    const [studentModalAdd, setStudentModalAdd] = useState<boolean>(false);

    const group = useAppSelector((state: RootState) => state.group.groupCard)

    const dispatch = useAppDispatch();


    const handleEdit = (id: string) => {
        setOpen(true);
        setSelectedItemId(group.find(item => item.id === id) || null);
    }

    const handleDelete = (e: React.FormEvent, id: string) => {
        e.preventDefault()
        dispatch(setAssentModal(true))
        setGroupId(id)
    };

    const submitGreen = async(e: React.FormEvent) => {
        e.preventDefault();

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
                        open && <GroupCreateModal setOpen={setOpen} selectedItem={selectedItemId} />
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