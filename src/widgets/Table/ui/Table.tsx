import React, {Dispatch, useEffect, useState} from 'react';
import '../style/styles.scss';
import editImg from '@/shared/image/table-button/edit.svg';
import deleteImg from '@/shared/image/table-button/delete.svg';
import Image from 'next/image';
import NoRecords from "@/shared/ui/NoRecords";
import send from "@/shared/image/table-button/send.svg";
import ButtonSend from "@/features/buttonSend/ui/ButtonSend";
import StudentWork from "@/widgets/modal/studentWork/ui/StudentWork";
import {Person, TableHeadProps} from "@/app/types";

interface TableProps {
    tableData: Person[]
    theadObj: TableHeadProps;
    body: Person[];
    setTableData: Dispatch<React.SetStateAction<Person[]>>;
    teacher: boolean;
}

const Table: React.FC<TableProps> = ({theadObj, body, teacher, tableData, setTableData}) => {
    const [open, setOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const handleEditClick = (element: number) => {
        setOpen(true);
        setSelectedItemId(element);
    };

    const selectedItem = body ? body.find(item => item.id === selectedItemId) : null;

    const getWorkStatus = (level: number | undefined): string => {
        if (typeof level === 'number') {
            switch (level) {
                case 1:
                    return 'Не начат';
                case 2:
                    return 'В процессе';
                case 3:
                    return 'Завершен';
                default:
                    return 'Неизвестно';
            }
        } else {
            return 'Неизвестно';
        }
    };

    const handleDelete = (id: number) => {
        setTableData(prevData => prevData.filter(item => item.id !== id));
    };


    return (
        <>
            {tableData.length !== 0 ? (
                <div className="table-border">
                    <div className="table-container">
                        <table className="table">
                            <thead className="table__thead">
                            <tr className="table__tr table__tr-thead">
                                <th>{theadObj.pole1}</th>
                                <th>{theadObj.pole2}</th>
                                <th>{theadObj.pole3}</th>
                                <th>{theadObj.pole4}</th>
                                <th>{theadObj.pole5}</th>
                            </tr>
                            </thead>
                            <tbody className="table__tbody">
                            {tableData.map((item) => (
                                <tr className="table__tr table__tr-body" key={item.id}>
                                    <td aria-label="ФИО студента">{item.fio}</td>
                                    <td aria-label="Название проекта">{item.title}</td>
                                    <td aria-label="Прогресс">{item.progress + '%'}</td>
                                    <td aria-label="Этап работы">{getWorkStatus(item.level)}</td>
                                    <td aria-label="Действия" className="table-button">
                                        <div className="table__tr-btn">
                                            <button className="edit" onClick={() => handleEditClick(item.id as number)}>
                                                Изменить
                                            </button>
                                            <Image src={editImg} alt="edit"/>
                                        </div>
                                        <div className="table__tr-btn">
                                            <button className="delete"
                                                    onClick={() => handleDelete(item.id as number)}>Удалить
                                            </button>
                                            <Image src={deleteImg} alt="delete"/>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <NoRecords title={'У вас нет курсовых работ'}/>
            )}

            {!teacher && tableData.length !== 0 ?
                <ButtonSend title={'Отправить задание на проверку'} img={send}/>
                : null
            }

            {open && selectedItem &&
                <StudentWork
                    open={open}
                    setOpen={setOpen}
                    item={selectedItem}
                    body={body}
                    setTableData={setTableData}/>
            }
        </>
    );
};

export default Table;