import React, {useEffect, useState} from 'react';
import '../styles/styles.scss'

import WorkerCreateModal from "@/widgets/workerCreate/ui/WorkerCreateModal";
import NoRecords from "@/shared/ui/NoRecords";
import AssentModal from "@/widgets/modal/assent/ui/AssentModal";

import Image from "next/image";
import deleteImg from "@/shared/image/table-button/deleteControl.svg";
import editImg from "@/shared/image/table-button/editControl.svg";
import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {setAssentModal, setTableData} from "@/features/employees/slice/employees";
import {employeesDelete} from "@/features/employees/action/action";

interface TableWorker {
    theadObj: TableHeadProps;
}

const TableWorker: React.FC<TableWorker> = (
    {
        theadObj,
    }) => {

    const [open, setOpen] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const assentModal = useAppSelector((state: RootState) => state.employees.assentModal);
    const [confirm, setConfirm] = useState<string | null>(null)

    const [dataFilter, setDataFilter] = useState<any>();



    const tableDataStudent = useAppSelector((state: RootState) => state.student.tableDataStudent)

    useEffect(() => {
        // const filteredTableDataStudent = tableDataStudent.filter(tableWorker => tableWorker.id === "1718563230323");
        setDataFilter(tableDataStudent)
    }, [tableDataStudent]);



    const dispatch = useAppDispatch();

    let selectedItem

    // const handleEdit = (id: string) => {
    //     setOpen(true);
    //     console.log(id)
    //     // setSelectedItemId(id)
    //
    //     const item:any = tableData.find(item => item.id === id);
    //     setSelectedItemId(item);
    //
    //
    // }


    // const handleDelete = (e: React.FormEvent, id: string) => {
    //     e.preventDefault()
    //     dispatch(setAssentModal(true))
    //     setConfirm(id)
    // };
    //
    // const submitGreen = async(e: React.FormEvent) => {
    //     e.preventDefault();
    //
    //     const id: any = confirm
    //
    //     dispatch(employeesDelete({id}))
    //     dispatch(setTableData(tableData.filter((item) => item.id !== confirm)))
    //
    //     dispatch(setAssentModal(false))
    // };
    //
    // const submitRed = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     dispatch(setAssentModal(false))
    // }

    const getStudentBlocked = (blocked: boolean): string => {
            switch(blocked) {
                case true:
                    return "Заблокирован"
                case false:
                    return "Разблокирован"
                default:
                 return "Неизвестно"
            }
    }




    return (
        <>
            {tableDataStudent && tableDataStudent.length !== 0 ? (
                <div className="table-border">
                    <div className="table-container">
                        <table className="table">
                            <thead className="table__thead">
                            <tr className="table__tr table__tr-thead">
                                {theadObj?.pole1 ? <th>{theadObj.pole1}</th> : null}
                                {theadObj?.pole2 ? <th>{theadObj.pole2}</th> : null}
                                {theadObj?.pole3 ? <th>{theadObj.pole3}</th> : null}
                                {theadObj?.pole4 ? <th>{theadObj.pole4}</th> : null}
                                {theadObj?.pole5 ? <th>{theadObj.pole5}</th> : null}
                            </tr>
                            </thead>
                            <tbody className="table__tbody">
                            {tableDataStudent.map((item) => (

                                <tr className="table__tr table__tr-body" key={item.id}>
                                    <td title={item.firstName}>{item.firstName}</td>
                                    <td title={item.lastName}>{item.lastName}</td>
                                    <td title={item.middleName}>{item.middleName}</td>
                                    <td title={getStudentBlocked(item.blocked)}>{getStudentBlocked(item.blocked)}</td>
                                    <td className="table-button">
                                        <div className="table__tr-btn">
                                            {/*<Image onClick={() => handleEdit(item.id)} src={editImg}*/}
                                            {/*       alt="edit"/>*/}
                                            {/*<Image onClick={(e) => handleDelete(e, item.id)} src={deleteImg}*/}
                                            {/*       alt='delete'/>*/}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <NoRecords title={'Студентов нет'}/>
            )}


            {/*{*/}
            {/*    open && <WorkerCreateModal setOpen={setOpen} selectedItem={selectedItemId}/>*/}
            {/*}*/}

            {/*{*/}
            {/*    assentModal && <AssentModal title={'Вы уверены что хотите удалить пользователя'}*/}
            {/*                                submitGreen={submitGreen} submitRed={submitRed}/>*/}
            {/*}*/}
        </>
    );
};

export default TableWorker;