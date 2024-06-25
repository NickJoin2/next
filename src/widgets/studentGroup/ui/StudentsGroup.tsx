import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/widgets/tableWorker/ui/styles.scss';
import NoRecords from '@/shared/ui/NoRecords';
import Image from 'next/image';
import deleteImg from '@/shared/image/table-button/deleteControl.svg';
import editImg from '@/shared/image/table-button/edit.svg';
import { RootState, useAppDispatch, useAppSelector } from '@/app/store/appStore';
import { setAssentModal } from '@/features/other/slice/other';
import AssentModal from '@/widgets/assentModal/ui/AssentModal';
import styled from 'styled-components';
import StudentCreateModal from '@/widgets/studentCreateModal/ui/StudentCreateModal';
import {groupReadStudent, studentDelete} from '@/features/student/actions/students';
import {setTableDataGroupStudentDelete, setTableStudentDelete} from '@/features/students/slice/students';


export const  StudentGroupTable = ({groupId}: {groupId: string}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [confirm, setConfirm] = useState<string>('');

    const assentModal = useAppSelector((state: RootState) => state.other.assentModal);
    const tableData = useAppSelector((state: RootState) => state.student.findData);
    const [keys, setKeys] = useState<number>();

    const dispatch = useAppDispatch();

    const theadObj = ['Имя','Фамилия','Отчество','Выпускник','Блокировка','Действие',]

    useEffect(() => {
        if (groupId) {
            dispatch(groupReadStudent({ groupId }));
        }
    }, [groupId, dispatch]);

    useEffect(() => {
        dispatch(setTableStudentDelete(tableData));
    }, [tableData, dispatch]);

    useEffect(() => {
        if (tableData && tableData.length > 0) {
            setKeys(Object.keys(tableData[0]).length)
        } else {
            console.log('tableData is undefined, null, or empty');
        }
    }, [tableData]);


    const TD = styled.td`
        min-width: ${keys ? `calc(1135px / ${keys})` : 'auto'};
        max-width: ${keys ? `calc(1135px / ${keys})` : 'auto'};
        width: ${keys ? `calc(1135px / ${keys})` : 'auto'};
    `;

    const handleEdit = (id: string) => {
        setOpen(true);
        console.log(id);

        const item: any = tableData.find(item => item.id === id);
        setSelectedItemId(item);
    };

    const handleDelete = (id: string) => {
        dispatch(setAssentModal(true));
        setConfirm(id);
    };

    const submitGreen = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = confirm;

        dispatch(studentDelete({ id }));
        dispatch(setTableDataGroupStudentDelete(tableData.filter((item) => item.id !== id)));
        dispatch(setAssentModal(false));
    };

    const submitRed = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setAssentModal(false));
    };

    const blockedConfirm = (blocked: boolean): string => {
        switch (blocked) {
            case false:
                return 'Заблокирован';
            case true:
                return 'Разблокирован';
            default:
                return 'Неизвестен';
        }
    };

    const graduateConfirm = (graduate: boolean): string => {
        switch (graduate) {
            case false:
                return 'Нет';
            case true:
                return 'Выпускник';
            default:
                return 'Неизвестен';
        }
    };

    tableData.forEach(item => {
        console.log(item.graduated);
    })

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
                                        <TD title={graduateConfirm(item.graduated)}>{graduateConfirm(item.graduated)}</TD>
                                        <TD title={blockedConfirm(item.blocked)}>{blockedConfirm(item.blocked)}</TD>
                                        <TD className="tableW-button">
                                            <div className="tableW__tr-btn">
                                                <button>
                                                    <Image onClick={() => handleEdit(item.id)} src={editImg} width={29} alt="edit" />
                                                </button>
                                                <button>
                                                    <Image onClick={() => handleDelete(item.id)} src={deleteImg} alt='delete' />
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
                    <NoRecords title={'Студентов нет'} />
                )}

                {open && <StudentCreateModal setOpen={setOpen} selectedItem={selectedItemId} groupId={groupId} />}

                {assentModal && (
                    <AssentModal title={'Вы уверены что хотите удалить студента?'} submitGreen={submitGreen} submitRed={submitRed} />
                )}

        </>
    );
};

export default StudentGroupTable