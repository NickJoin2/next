'use client'
import React, {useEffect, useState} from "react";
import styled from "styled-components";

import TableWorker from "@/widgets/tableWorker/ui/TableWorker";
import Title from "@/shared/ui/Title";
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import WorkerCreateModal from "@/widgets/control/modal/workerCreate/ui/WorkerCreateModal";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {employeesRead} from "@/features/employees/action/action";
import {setTableData} from "@/features/employees/slice/employees";


export default function worker() {
    const [openCreate, setOpenCreate] = useState(false);

    const dispatch = useAppDispatch();

    const data = useAppSelector((state: RootState) => state.employees.data)

    useEffect(() => {
        dispatch(employeesRead())
    }, []);

    useEffect(() => {
        dispatch(setTableData(data));
    }, [data]);

    const Record = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 50px;`

        const theadObj = ['Имя','Фамилия','Отчество','Должность','Блокировка','Действие',]

    return (
        <section>
            <div className="container">
                <Record>
                    <Title title={'Сотрудники'} position={'start'}/>
                    <ButtonAuth title={'Добавить'} anim={true} width={178} height={65} setOpen={setOpenCreate}
                                margin={'0 0 0 0'}/>
                </Record>

                <TableWorker theadObj={theadObj}/>

                {
                    openCreate ? <WorkerCreateModal setOpen={setOpenCreate}/> : null
                }

            </div>
        </section>
    )

}
