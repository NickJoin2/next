'use client'
import React, {useEffect, useState} from "react";

import 'react-toastify/dist/ReactToastify.css';

import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import Title from "@/shared/ui/Title";
import {GroupModalCreate} from "@/widgets/groupModalCreate";
import {GroupCard} from "@/widgets/groupCard";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {setGroup, setGroupMessageZero} from "@/features/group/slice/group";
import {groupRead} from "@/features/group/action/action";
import {BreadCrumbs} from "@/features/breadCrumbs";
import {toast, ToastContainer} from "react-toastify";

const success = ['Группа создана','Группа удалена','Групппа обновленна','Студент создан']
const errors = ['Запрос не прошел валидацию','Пользователь не имеет прав на добавление группы','Пользователь не имеет прав на добавление группы','Пользователь не имеет прав на получение списка групп','Неизвестная ошибка','Пользователь не имееет прав на удаление студенческой группы','Группа не найдена','Пользователь не имеет доступ на изменение группы','Пользователь не имеет доступ на добавление студента']


const ControlGroup = () => {
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    const data = useAppSelector((state: RootState) => state.group.data)
    const message = useAppSelector((state: RootState) => state.group.message)
    const error = useAppSelector((state: RootState) => state.group.error)

    const breadCrumb = {
        '/': 'Главная',
        '/control': 'Контроль',
        '/control/groups': 'Группы',
    };

    const dispatch = useAppDispatch();



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
            dispatch(setGroupMessageZero())
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
            dispatch(setGroupMessageZero())
        }

    }, [message,error,dispatch]);

    useEffect(() => {
        dispatch(groupRead())
    }, [dispatch]);

    useEffect(() => {
        dispatch(setGroup(data));
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
                    <div>
                        <Title title={'Группы'} position={'start'}/>
                        <BreadCrumbs breadCrumb={breadCrumb} />
                    </div>


                    <ButtonAuth title={'Создать группу'} anim={true} width={255} height={65}
                                setOpen={setCreateModalOpen}
                                margin={'0 0 0 0'}/>
                </div>

                <GroupCard/>

                <GroupModalCreate setOpen={setCreateModalOpen} open={createModalOpen}/>

            </div>

        </section>
    )

}

export default ControlGroup;