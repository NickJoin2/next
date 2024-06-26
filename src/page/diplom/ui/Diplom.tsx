'use client'
import React, {useEffect, useState} from "react";
import styled from "styled-components";

import Title from "@/shared/ui/Title";
import DiplomCreateModal from "@/widgets/diplomCreateModal/ui/DiplomCreateModal";
import DiplomTable from "@/widgets/diplomTable/ui/DiplomTable";
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {Person} from "@/features/types";
import {setTableDataStudentDiplom} from "@/features/studentD/slice/studentD";

import {studentReadDiplom} from "@/features/studentD/action/action";
import {BreadCrumbs} from "@/features/breadCrumbs";


const Diplom = () =>  {
    const [openCreate, setOpenCreate] = useState(false);
    const dispatch = useAppDispatch();
    const data:Person[] = useAppSelector((state: RootState) => state.studentDiplom.data)

    useEffect(() => {
        dispatch(studentReadDiplom())
    }, [dispatch]);

    useEffect(() => {
        dispatch(setTableDataStudentDiplom(data));
    }, [data,dispatch]);

    const theadObj = ['ФИО студента','Название проекта','Преподаватель','Этап работы','Ссылка на проект','Действия' ]

    return (
        <section>
            <div className="container">
                <div className='record'>
                    <div className="studentC-title">
                        <Title title={'Дипломные работы'} position={'start'}/>
                    </div>
                    <ButtonAuth title={'Добавить'} anim={true} width={178} height={65} setOpen={setOpenCreate}
                                margin={'0 0 0 0'}/>
                </div>

                <DiplomTable theadObj={theadObj}/>


                     <DiplomCreateModal setOpen={setOpenCreate} open={openCreate}/>


            </div>
        </section>
    )

}
export default Diplom;