'use client'
import React, {useEffect, useState} from "react";

import 'react-toastify/dist/ReactToastify.css';

import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import Title from "@/shared/ui/Title";
import {SpecializationsModalCreate} from "@/widgets/specializationsModalCreate";
import {SpecializationCard} from "@/widgets/specializationCard";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {specializationsRead} from "@/features/specializations/action/action";
import {setCardSpecializations, setSpecializationMessageZero} from "@/features/specializations/slice/specialization";
import {BreadCrumbs} from "@/features/breadCrumbs";
import {toast, ToastContainer} from "react-toastify";



const success = ['Специализация создана','Специализация обновленна','Специализация удалена']
const errors = ['Пользователь не имеет прав на получение специализации','Неизвестная ошибка','Запрос не прошел валидацию','Пользователь не имеет прав на добавление специализации','Запрос не прошел валидацию','Пользователь не имеет прав на изменение специализации','Пользователь не имеет прав на удаление специализации','Специализация не найдена']

const ControlSpecializations = () => {
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    const data = useAppSelector((state: RootState) => state.specialization.data)
    const message = useAppSelector((state: RootState) => state.specialization.message)
    const error = useAppSelector((state: RootState) => state.specialization.error)

    const dispatch = useAppDispatch();

    const breadCrumb = {
        '/': 'Главная',
        '/control': 'Контроль',
        '/control/specializations': 'Специализации',
    };

    useEffect(() => {

        if(message === '') return

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
            dispatch(setSpecializationMessageZero())
        }

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
            dispatch(setSpecializationMessageZero())
        }

    }, [message,error,dispatch]);


    useEffect(() => {
        dispatch(specializationsRead())
    }, [dispatch]);

    useEffect(() => {
        dispatch(setCardSpecializations(data));
    }, [data, dispatch]);


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

                <div className="record">
                    <div className="block">
                        <Title title={'Специализации'} position={'start'}/>
                        <BreadCrumbs breadCrumb={breadCrumb}/>
                    </div>

                    <ButtonAuth title={'Создать специализацию'} anim={true} width={255} height={65}
                                setOpen={setCreateModalOpen}
                                margin={'0 0 0 0'}/>

                </div>

                <SpecializationCard/>

                <SpecializationsModalCreate setOpen={setCreateModalOpen} open={createModalOpen}/>

            </div>
        </section>
    )

}

export default ControlSpecializations;