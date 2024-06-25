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
import {setTableDataStudentC, setTableDataStudentCursach} from "@/features/student/slice/slice";


const StudentCursovik = () =>  {
    const [openCreate, setOpenCreate] = useState(false);

    const dispatch = useAppDispatch();

    const data:Person[] = useAppSelector((state: RootState) => state.studentCursach.data)

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        dispatch(studentCursachRead())
    }, []);


    useEffect(() => {
        dispatch(setTableDataStudentCursach(data));
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
                        <Title title={'Курсовые работы'} position={'start'}/>
                    </div>
                    <ButtonAuth title={'Добавить'} anim={true} width={178} height={65} setOpen={setOpenCreate}
                                margin={'0 0 0 0'}/>
                </Record>

                <StudentCursovikTable theadObj={theadObj}/>

                {
                    openCreate ? <StudentCursovikCreateModal setOpen={setOpenCreate}/> : null
                }



            </div>
        </section>
    )

}
export default StudentCursovik;