'use client'
import React, {useEffect, useState} from "react";

import 'react-toastify/dist/ReactToastify.css';

import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import Title from "@/shared/ui/Title";
import {GroupModalCreate} from "@/widgets/groupModalCreate";
import {StudentGroup} from "@/widgets/studentGroup";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {setGroup, setGroupMessageZero} from "@/features/group/slice/group";
import {groupRead} from "@/features/group/action/action";
import {toast, ToastContainer} from "react-toastify";
import {setStudentMessageZero} from "@/features/students/slice/students";


const success = ['Студент обновлен','Студент удален']
const errors = ['Пользователь не имеет прав на получение студента','Студент не найден','Неизвестная ошибка','Пользователь не имеет прав на получение студента','Пользователь не имеет прав на удаление студента','Пользователь не имеет прав на получения студентов группы','Пользователь не имеет прав на перевод в выпускники']

const ControlGroupStudent = ({params}: { params: any }) => {
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");


    const data = useAppSelector((state: RootState) => state.group.data)
    const message = useAppSelector((state: RootState) => state.student.message)
    const error = useAppSelector((state: RootState) => state.student.message)

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
            dispatch(setStudentMessageZero())
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
            dispatch(setStudentMessageZero())
        }

    }, [dispatch,errors,success,message,error]);


    const {groupId} = params;

    useEffect(() => {
        dispatch(groupRead())
    }, [dispatch]);

    useEffect(() => {
        const group = data.find(item => item.id === groupId);
        if (group) {
            setName(group.name);
        }
    }, [data, groupId]);

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

                <div className='record'>
                    <Title title={name} position={'start'}/>
                    <ButtonAuth title={'Создать студента'} anim={true} width={255} height={65}
                                setOpen={setCreateModalOpen}
                                margin={'0 0 0 0'}/>
                </div>

                <StudentGroup groupId={groupId}/>

                <GroupModalCreate setOpen={setCreateModalOpen} open={createModalOpen}/>

            </div>
        </section>
    )

}

export default ControlGroupStudent;