import React, {useEffect, useState} from 'react';
import Image from "next/image";
import styled from "styled-components";

import '@/widgets/tableWorker/ui/styles.scss'

import NoRecords from "@/shared/ui/NoRecords";
import {StudentModalCreate} from "../../studentModalCreate";
import {AssentModal} from "@/widgets/assentModal";


import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {setAssentModal} from "@/features/other/slice/other";
import {studentDelete} from "@/features/student/actions/students";
import {setTableStudentDelete} from "@/features/students/slice/students";

import deleteImg from "@/shared/image/table-button/deleteControl.svg";
import editImg from "@/shared/image/table-button/edit.svg";
import {StudentDTO} from "@/features/types";


interface TableWorker {
    theadObj: string[];
}

const StudentTable: React.FC<TableWorker> = (
    {
        theadObj,
    }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<StudentDTO | null>(null);
    const [id, setId] = useState<string>('')
    const [keys, setKeys] = useState<number>();

    const assentModal = useAppSelector((state: RootState) => state.other.assentModal);
    const tableData = useAppSelector((state: RootState) => state.student.tableDataStudent)

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tableData && tableData.length > 0) {
            setKeys(Object.keys(tableData[0]).length - 1)
        }
    }, [tableData]);

    const TD = styled.td`
        min-width: ${keys ? `calc(1135px / ${keys})` : 'auto'};
        max-width: ${keys ? `calc(1135px / ${keys})` : 'auto'};
        width: ${keys ? `calc(1135px / ${keys})` : 'auto'};
    `;

    const handleEdit = (id: string) => {
        setSelectedItemId(tableData.find(item => item.id === id) || null);
        setOpen(true);
    }

    const handleDelete = (id: string) => {
        dispatch(setAssentModal(true))
        setId(id)
    };

    const submitGreen = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(studentDelete({id}))
        dispatch(setTableStudentDelete(tableData.filter((item) => item.id !== id)))
        dispatch(setAssentModal(false))
    };

    const submitRed = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(setAssentModal(false))
    }

    const blockedConfirm = (blocked: boolean): string => {
        switch (blocked) {
            case false:
                return 'Заблокирован';
            case true:
                return 'Разблокирован';
            default:
                return 'Неизвестен';
        }
    }

    return (
        <>
            {tableData && tableData.length !== 0 ? (
                <div className="tableW-border">
                    <div className="tableW-container">
                        <table className="tableW">
                            <thead className="tableW__thead">
                            <tr className="tableW__tr tableW__tr-thead">
                                {theadObj.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="tableW__tbody">
                            {tableData.map((item: StudentDTO) => (
                                <tr className="tableW__tr tableW__tr-body" key={item.id}>
                                    <TD title={item.firstName}>{item.firstName}</TD>
                                    <TD title={item.lastName}>{item.lastName}</TD>
                                    <TD title={item.middleName}>{item.middleName}</TD>
                                    <TD title={blockedConfirm(item.blocked)}>{blockedConfirm(item.blocked)}</TD>
                                    <TD className="tableW-button">
                                        <div className="tableW__tr-btn">
                                            <button title='Редактировать'>
                                                <Image onClick={() => handleEdit(item.id)} src={editImg} width={29}
                                                       alt="check"/>
                                            </button>
                                            <button title='Удалить'>
                                                <Image onClick={() => handleDelete(item.id)} src={deleteImg}
                                                       alt='delete'/>
                                            </button>
                                        </div>
                                    </TD>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <NoRecords title={'Студентов нет'}/>
            )}

            <StudentModalCreate setOpen={setOpen} selectedItem={selectedItemId} open={open}/>

            <AssentModal title={'Вы уверены что хотите удалить студента?'}
                         submitGreen={submitGreen} submitRed={submitRed} open={assentModal}/>

        </>
    );
};

export default StudentTable;