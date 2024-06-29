import React, {useEffect, useState} from 'react';
import Image from "next/image";
import styled from "styled-components";

import './styles.scss'

import NoRecords from "@/shared/ui/NoRecords";
import {WorkerCreateModal} from "../../workerCreateModal";
import {AssentModal} from "@/widgets/assentModal";

import {Posts} from "@/app/types";
import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {setTableData} from "@/features/employees/slice/employees";
import {employeesDelete} from "@/features/employees/action/action";
import {setAssentModal} from "@/features/other/slice/other";

import deleteImg from "@/shared/image/table-button/deleteControl.svg";
import editImg from "@/shared/image/table-button/editControl.svg";
import {EmployeeDTO} from "@/features/types";


const TableWorker = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<EmployeeDTO | null>(null);
    const [id, setId] = useState<string>('')
    const [keys, setKeys] = useState<number>();

    const assentModal = useAppSelector((state: RootState) => state.other.assentModal);
    const tableData = useAppSelector((state: RootState) => state.employees.tableData)

    const dispatch = useAppDispatch();

    const theadObj = ['Имя', 'Фамилия', 'Отчество', 'Должность', 'Блокировка', 'Действие']

    useEffect(() => {
        if (tableData && tableData.length > 0) {
            setKeys(Object.keys(tableData[0]).length)
        }
    }, [tableData]);

    const TD = styled.td`
        min-width: ${keys ? `calc(1135px / ${keys})` : 'auto'};
        max-width: ${keys ? `calc(1135px / ${keys})` : 'auto'};
        width: ${keys ? `calc(1135px / ${keys})` : 'auto'};
    `;

    const handleEdit = (id: string) => {
        setOpen(true);
        setSelectedItemId(tableData.find(item => item.id === id) || null);
    }

    const handleDelete = (id: string) => {
        dispatch(setAssentModal(true))
        setId(id)
    };

    const submitGreen = async (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(employeesDelete({id}))
        dispatch(setTableData(tableData.filter((item) => item.id !== id)))
        dispatch(setAssentModal(false))
    };

    const submitRed = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(setAssentModal(false))
    }

    const getWorker = (posts: Posts[]): string => {
        let textPost: string[] = [];

        posts.map(post => {
            textPost.push(post.name)
        })

        const result: string = textPost.join(', ')

        return result
    }

    const blockedConfirm = (blocked: boolean): string => {
        switch (blocked) {
            case true:
                return 'Заблокирован';
            case false:
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
                            {tableData.map((item) => (
                                <tr className="tableW__tr tableW__tr-body" key={item.id}>
                                    <TD title={item.firstName}>{item.firstName}</TD>
                                    <TD title={item.lastName}>{item.lastName}</TD>
                                    <TD title={item.middleName}>{item.middleName}</TD>
                                    <TD title={getWorker(item.posts as Posts[])}>{getWorker(item.posts as Posts[])}</TD>
                                    <TD title={blockedConfirm(item.blocked)}>{blockedConfirm(item.blocked)}</TD>
                                    <TD className="tableW-button">
                                        <div className="tableW__tr-btn">
                                            <Image onClick={() => handleEdit(item.id)} src={editImg}
                                                   alt="edit"/>
                                            <Image onClick={() => handleDelete(item.id)} src={deleteImg}
                                                   alt='delete'/>
                                        </div>
                                    </TD>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <NoRecords title={'Сотрудников нет'}/>
            )}

            <WorkerCreateModal setOpen={setOpen} selectedItem={selectedItemId} open={open}/>

            <AssentModal title={'Вы уверены что хотите удалить работу?'}
                         submitGreen={submitGreen} submitRed={submitRed} open={assentModal}/>

        </>
    );
};

export default TableWorker;