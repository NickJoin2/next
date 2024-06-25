'use client'
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import '@/widgets/tableWorker/ui/styles.scss';
// import NoRecords from '@/shared/ui/NoRecords';
// import Image from 'next/image';
// import deleteImg from '@/shared/image/table-button/deleteControl.svg';
// import editImg from '@/shared/image/table-button/edit.svg';
// import { RootState, useAppDispatch, useAppSelector } from '@/app/store/appStore';
// import { setAssentModal } from '@/features/other/slice/other';
// import AssentModal from '@/widgets/assentModal/ui/AssentModal';
// import styled from 'styled-components';
// import StudentCreateModal from '@/widgets/studentCreateModal/ui/StudentCreateModal';
// import {groupReadStudent, studentDelete} from '@/features/student/actions/students';
// import { setTableStudentDelete } from '@/features/students/slice/students';
//
//
// export default function StudentTable({ params }: { params: any }) {
//     const [open, setOpen] = useState<boolean>(false);
//     const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
//     const [confirm, setConfirm] = useState<string>('');
//
//     const assentModal = useAppSelector((state: RootState) => state.other.assentModal);
//     const tableData = useAppSelector((state: RootState) => state.student.findData);
//
//     const dispatch = useAppDispatch();
//     const router = useRouter();
//     const { groupId } = params; // Извлечение groupId из параметров
//
//     useEffect(() => {
//         if (groupId) {
//             dispatch(groupReadStudent({ groupId }));
//         }
//     }, [groupId, dispatch]);
//
//     useEffect(() => {
//         dispatch(setTableStudentDelete(tableData));
//     }, [tableData, dispatch]);
//
//     const TD = styled.td`
//         min-width: calc(1135px / 6);
//         max-width: calc(1135px / 6);
//         width: calc(1135px / 6);
//     `;
//
//     const handleEdit = (id: string) => {
//         setOpen(true);
//         console.log(id);
//
//         const item: any = tableData.find(item => item.id === id);
//         setSelectedItemId(item);
//     };
//
//     const handleDelete = (id: string) => {
//         dispatch(setAssentModal(true));
//         setConfirm(id);
//     };
//
//     const submitGreen = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const id = confirm;
//
//         dispatch(studentDelete({ id }));
//         dispatch(setTableStudentDelete(tableData.filter((item) => item.id !== id)));
//         dispatch(setAssentModal(false));
//     };
//
//     const submitRed = (e: React.FormEvent) => {
//         e.preventDefault();
//         dispatch(setAssentModal(false));
//     };
//
//     const blockedConfirm = (blocked: boolean): string => {
//         switch (blocked) {
//             case false:
//                 return 'Заблокирован';
//             case true:
//                 return 'Разблокирован';
//             default:
//                 return 'Неизвестен';
//         }
//     };
//
//     return (
//         <>
//             <div className="container">
//                 {tableData && tableData.length !== 0 ? (
//                     <div className="tableW-border">
//                         <div className="tableW-container">
//                             <table className="tableW">
//                                 <thead className="tableW__thead">
//                                 <tr className="tableW__tr tableW__tr-thead">
//                                     <th>Имя</th>
//                                     <th>Фамилия</th>
//                                     <th>Отчество</th>
//                                     <th>Выпускник</th>
//                                     <th>Блокировка</th>
//                                     <th>Действия</th>
//                                 </tr>
//                                 </thead>
//                                 <tbody className="tableW__tbody">
//                                 {tableData.map((item) => (
//                                     <tr className="tableW__tr tableW__tr-body" key={item.id}>
//                                         <TD title={item.firstName}>{item.firstName}</TD>
//                                         <TD title={item.lastName}>{item.lastName}</TD>
//                                         <TD title={item.middleName}>{item.middleName}</TD>
//                                         <TD title={blockedConfirm(item.blocked)}>{blockedConfirm(item.blocked)}</TD>
//                                         <TD className="tableW-button">
//                                             <div className="tableW__tr-btn">
//                                                 <button>
//                                                     <Image onClick={() => handleEdit(item.id)} src={editImg} width={29} alt="edit" />
//                                                 </button>
//                                                 <button>
//                                                     <Image onClick={() => handleDelete(item.id)} src={deleteImg} alt='delete' />
//                                                 </button>
//                                             </div>
//                                         </TD>
//                                     </tr>
//                                 ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 ) : (
//                     <NoRecords title={'Студентов нет'} />
//                 )}
//
//                 {open && <StudentCreateModal setOpen={setOpen} selectedItem={selectedItemId} />}
//
//                 {assentModal && (
//                     <AssentModal title={'Вы уверены что хотите удалить студента?'} submitGreen={submitGreen} submitRed={submitRed} />
//                 )}
//             </div>
//
//         </>
//     );
// };

import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

import styled from "styled-components";
import React, {useEffect, useState} from "react";

import Title from "@/shared/ui/Title";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {setGroup} from "@/features/group/slice/group";
import {groupRead} from "@/features/group/action/action";

import {useRouter} from "next/navigation";
import StudentGroupTable from "@/widgets/studentGroup/ui/StudentsGroup";
import {GroupDTO} from "@/features/types";
import GroupCreateModal from "@/widgets/groupModalCreate/ui/GroupModalCreate";


function StudentGroup() {
    return null;
}

const ControlGroupStudent = ({ params }: { params: any }) => {
    const [open, setOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");

    const dispatch = useAppDispatch();

    const data = useAppSelector((state:RootState) => state.group.data)

    const router = useRouter();
    const { groupId } = params;

    useEffect(() => {
        dispatch(groupRead())
    }, []);

    useEffect(() => {
        const group = data.find(item => item.id === groupId);
        if (group) {
            setName(group.name);
        }
    }, [data, groupId]);



    useEffect(() => {
        dispatch(setGroup(data));
    }, [data, dispatch]);


    const Record = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        padding-top: 40px`

    return (
        <section>
            <div className="container">

                <Record>
                    <Title title={name} position={'start'}/>
                    <ButtonAuth title={'Создать студента'} anim={true} width={255} height={65} setOpen={setCreateModalOpen}
                                margin={'0 0 0 0'}/>
                </Record>

                <StudentGroupTable groupId={groupId}/>

                {
                    createModalOpen && <GroupCreateModal setOpen={setCreateModalOpen}/>
                }
            </div>
        </section>
    )

}

export default ControlGroupStudent;