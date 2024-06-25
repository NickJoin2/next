'use client'
import React, {useEffect, useState} from "react";
import styled from "styled-components";

import Title from "@/shared/ui/Title";
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import StudentCursovikTable from "@/widgets/studentCursovikTable/ui/StudentCursovikTable";

import {studentCursachRead} from "@/features/students/action/action";
import StudentCursovikCreateModal from "@/widgets/studentCursovikCreate/ui/StudentCursovikCreateModal";
import {Person} from "@/features/types";
import {setTableDataStudentDiplom} from "@/features/studentD/slice/studentD";
import DiplomTable from "@/widgets/diplomTable/ui/DiplomTable";
import {studentReadDiplom} from "@/features/studentD/action/action";
import DiplomCreateModal from "@/widgets/diplomCreateModal/ui/DiplomCreateModal";



const Diplom = () =>  {
    const [openCreate, setOpenCreate] = useState(false);
    const dispatch = useAppDispatch();
    const data:Person[] = useAppSelector((state: RootState) => state.studentDiplom.data)


    useEffect(() => {
        console.log(data)
    }, [data]);


    useEffect(() => {
        dispatch(studentReadDiplom())
    }, []);

    useEffect(() => {
        dispatch(setTableDataStudentDiplom(data));
    }, [data]);

    const Record = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 50px;`

    const theadObj = ['ФИО студента','Название проекта','Преподаватель','Этап работы','Ссылка на проект','Действия' ]

    return (
        <section>
            <div className="container">
                <Record>
                    <div className="studentC-title">
                        <Title title={'Дипломные работы'} position={'start'}/>
                    </div>
                    <ButtonAuth title={'Добавить'} anim={true} width={178} height={65} setOpen={setOpenCreate}
                                margin={'0 0 0 0'}/>
                </Record>

                <DiplomTable theadObj={theadObj}/>

                {
                    openCreate ? <DiplomCreateModal setOpen={setOpenCreate}/> : null
                }

            </div>
        </section>
    )

}
export default Diplom;