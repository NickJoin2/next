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
import {toast, ToastContainer} from "react-toastify";

const errors = ['Запрос не прошел валидацию','Пользователь не имеет прав на добавление сотрудников','Неизвестная ошибка','Пользователь не имеет прав на получение списка сотрудников','Пользователь не имеет прав на изменение сотрудника','Пользователь не найден','Пользователь не имеет прав на уделение сотрудника','Сотрудник не найден']
const success = ['Пользователь создан','Пользователь обновлен','Сотрудник удален']


const Workers = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const data = useAppSelector((state: RootState) => state.employees.data);

    const message = useAppSelector((state: RootState) => state.employees.message)
    const error = useAppSelector((state: RootState) => state.employees.error)




    const dispatch = useAppDispatch();

    const breadCrumb = {
        '/': 'Главная',
        '/control': 'Контроль',
        '/control/workers': 'Сотрудники',
    };

    useEffect(() => {
        if(errors.includes(error)) {
            toast.warn(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        if(success.includes(message)) {
            toast.success(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }, [message,error,dispatch]);

    useEffect(() => {
        dispatch(employeesRead());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setTableData(data));
    }, [dispatch, data]);

    return (
        <section>
            <div className="container">

                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
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

                <WorkerCreateModal setOpen={setOpenCreate} open={openCreate}/>

            </div>
        </section>
    );
};

export default Workers;