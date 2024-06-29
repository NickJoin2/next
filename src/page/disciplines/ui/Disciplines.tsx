'use client'
import React, {useEffect, useState} from "react";

import 'react-toastify/dist/ReactToastify.css';

import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import Title from "@/shared/ui/Title";
import {DisciplinesCard} from "@/widgets/disciplinesCard";
import {DisciplinesCreateModal} from "@/widgets/disciplinesCreateModal";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {setCardDisciplines, setMessageZero} from "@/features/disciplines/slice/disciplines";
import {disciplinesRead} from "@/features/disciplines/action/action";
import {BreadCrumbs} from "@/features/breadCrumbs";
import {toast, ToastContainer} from "react-toastify";


const errors = ['Запрос не прошел валидацию','Пользователь не имеет прав на добавление дисциплины','Неизвестная ошибка','Пользователь не имеет прав на изменение дисциплины','Пользователь не имеет прав на удаление дисциплины','Дисциплина не найдена','Преподаватель уже привязан к данной дисциплине','Пользователь не имеет прав на назначение дисциплины преподавателю','Дисциплина или преподаватель не найден','Сотрудник не привязан к данной дисциплине','Пользователь не имеет прав на снятие дисциплины преподавателю','Дисциплина или преподаватель не найдены']
const success = ['Дисциплина создана','Дисциплина обновлена','Дисциплина удалена','Дисциплина назначена','Дисциплина снята']


const ControlSpecializations = () => {
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    const data = useAppSelector((state: RootState) => state.disciplines.data)
    const message = useAppSelector((state: RootState) => state.disciplines.message)
    const error = useAppSelector((state:RootState) => state.disciplines.error)

    const dispatch = useAppDispatch();

    const breadCrumb = {
        '/': 'Главная',
        '/control': 'Контроль',
        '/control/disciplines': 'Дисциплины',
    };

    useEffect(() => {
        if(message === '') return

        if(errors.includes(error)) {
            toast.error(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(setMessageZero())
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
            dispatch(setMessageZero())
        }
    }, [dispatch,message,error]);

    useEffect(() => {
        dispatch(disciplinesRead())
    }, [dispatch]);

    useEffect(() => {
        dispatch(setCardDisciplines(data));
    }, [data, dispatch]);

    useEffect(() => {
        console.log(createModalOpen);
    }, [createModalOpen]);


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
                    <div className="block">
                        <Title title={'Дисциплины'} position={'start'}/>
                        <BreadCrumbs breadCrumb={breadCrumb}/>
                    </div>

                    <ButtonAuth title={'Создать дисциплину'} anim={true} width={255} height={65}
                                setOpen={setCreateModalOpen}
                                margin={'0 0 0 0'}/>
                </div>

                <DisciplinesCard/>

                <DisciplinesCreateModal setOpen={setCreateModalOpen} open={createModalOpen}/>

            </div>

        </section>
    )

}

export default ControlSpecializations;