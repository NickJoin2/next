import React, {useEffect, useState} from 'react';
import Image from "next/image";

import './styles.scss'

import NoRecords from "@/shared/ui/NoRecords";
import {AssentModal} from "@/widgets/assentModal";
import StudentCursovikCreateModal from "@/widgets/studentCursovikCreate/ui/StudentCursovikCreateModal";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {studentCursachDelete} from "@/features/students/action/action";
import {setAssentModal} from "@/features/other/slice/other";

import {Person} from "@/features/types";
import {setTableDataStudentCursach} from "@/features/student/slice/slice";


import deleteImg from '@/shared/image/table-button/delete.svg'
import editImg from '@/shared/image/table-button/edit.svg'
import file from '@/shared/image/table-button/file.svg'


interface StudentCursovikTableProps {
    theadObj: string[];
}

const StudentCursovikTable: React.FC<StudentCursovikTableProps> = (
    {
        theadObj,
    }) => {
    const [selectedItem, setSelectedItem] = useState<Person | undefined>();
    const [studentId, setStudentId] = useState<string>('')
    const [openCreate, setOpenCreate] = useState(false);
    const assentModal = useAppSelector((state: RootState) => state.other.assentModal)


    const tableData = useAppSelector((state: RootState) => state.studentCursach.tableDataStudent)


    useEffect(() => {
        console.log(assentModal)
    }, [assentModal]);



    const dispatch = useAppDispatch();


    const handleEditClick = (id: string) => {
        setSelectedItem(tableData.find(item => item.id === id));
        setOpenCreate(true)
    }


    const handleDelete = (id: string | undefined) => {
        dispatch(setAssentModal(true))

        if (id) setStudentId(id);
    };

    const submitGreen = async(e: React.FormEvent) => {
        e.preventDefault();

        if(!studentId) return

        dispatch(setTableDataStudentCursach(tableData.filter((item) => item.id !== studentId)));
        dispatch(studentCursachDelete({studentId}));

        dispatch(setAssentModal(false))
    };

    const submitRed = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(setAssentModal(false))
    }

    const getWorkStatus = (level: string | undefined): string => {
        if (typeof level === 'string') {
            switch (level) {
                case "1":
                    return 'Не начат';
                case "2":
                    return 'В процессе';
                case "3":
                    return 'Завершен';
                default:
                    return 'Неизвестно';
            }
        } else {
            return 'Неизвестно';
        }
    };

    return (
        <>
            {tableData && tableData.length !== 0 ? (
                <div className="studentC__table-border">
                    <div className="studentC__table-container">
                        <table className="studentC__table">
                            <thead className="studentC__table__thead">
                            <tr className="studentC__table__thead-tr">
                                {theadObj.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="studentC__table__tbody">
                            {tableData.map(item =>
                                <tr className="studentC__table__tr" key={item.id}>
                                    <td>{item.fio}</td>
                                    <td>{item.title}</td>
                                    <td>{item.prepodFio}</td>
                                    <td>{getWorkStatus(item.level as string | undefined)}</td>
                                    <td>{item.link !== "" ?
                                        <a href={item.link} target="_blank"><Image width={50} src={file.src}
                                                                                 alt="file"/></a> : 'Отсутствует'}
                                    </td>
                                    <td className="studentC__table-button">
                                        <div className="studentC__table__tr-btn">
                                            <button className="studentC__table__tr--edit"  onClick={() => handleEditClick(item.id as string)}>
                                                Изменить
                                                <Image src={editImg.src} alt="edit"/>
                                            </button>
                                        </div>
                                        <div className="studentC__table__tr-btn">
                                            <button className="studentC__table__tr--delete "
                                                    onClick={() => handleDelete(item.id as string | undefined)}>Удалить
                                                <Image src={deleteImg.src} alt="delete"/>
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <NoRecords title={'Курсовых работ нет'}/>
            )}


            {
                openCreate ? <StudentCursovikCreateModal setOpen={setOpenCreate} selectedItem={selectedItem}/> : null
            }

            {
                assentModal && <AssentModal title={'Вы уверены что хотите удалить работу?'}
                                            submitGreen={submitGreen} submitRed={submitRed}/>
            }
        </>
    );
};

export default StudentCursovikTable;