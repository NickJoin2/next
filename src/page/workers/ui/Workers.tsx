'use client'
import React, { useEffect, useState } from "react";

import Title from "@/shared/ui/Title";
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import { WorkerCreateModal } from "@/widgets/workerCreateModal";
import { TableWorker } from "@/widgets/tableWorker";

import { RootState, useAppDispatch, useAppSelector } from "@/app/store/appStore";
import { employeesRead } from "@/features/employees/action/action";
import { setTableData } from "@/features/employees/slice/employees";
import {BreadCrumbs} from "@/features/breadCrumbs";


interface WorkerProps {
    breadCrumb: { [key: string]: string };
}

const Workers = ({breadCrumb}:WorkerProps) => {
    const [openCreate, setOpenCreate] = useState(false);
    const data = useAppSelector((state: RootState) => state.employees.data);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(employeesRead());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setTableData(data));
    }, [dispatch, data]);

    return (
        <section>
            <div className="container">
                <div className='record'>
                    <div>
                        <Title title={'Сотрудники'} position={'start'}/>
                        <BreadCrumbs breadCrumb={breadCrumb}/>
                    </div>

                    <ButtonAuth
                        title={'Добавить'}
                        anim={true}
                        width={178}
                        height={65}
                        setOpen={setOpenCreate}
                        margin={'0 0 0 0'}
                    />
                </div>
                <TableWorker />
                {openCreate && <WorkerCreateModal setOpen={setOpenCreate}/>}
            </div>
        </section>
    );
};

export default Workers;