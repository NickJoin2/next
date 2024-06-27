import React, {useEffect, useState} from "react";


import Title from "@/shared/ui/Title";
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import {WorkerCreateModal} from "@/widgets/workerCreate";
import {TableWorker} from "@/widgets/tableWorker";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {employeesRead} from "@/features/employees/action/action";
import {setTableData} from "@/features/employees/slice/employees";


const workers = () => {
    const [openCreate, setOpenCreate] = useState(false);

    const data = useAppSelector((state: RootState) => state.employees.data)

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(employeesRead())
    }, []);

    useEffect(() => {
        dispatch(setTableData(data));
    }, [data]);

    return (
        <section>
            <div className="container">
                <div className='record'>
                    <Title title={'Сотрудники'} position={'start'}/>
                    <ButtonAuth title={'Добавить'} anim={true} width={178} height={65} setOpen={setOpenCreate}
                                margin={'0 0 0 0'}/>
                </div>

                <TableWorker/>

                {
                    openCreate ? <WorkerCreateModal setOpen={setOpenCreate}/> : null
                }

            </div>
        </section>
    )

}

export default workers