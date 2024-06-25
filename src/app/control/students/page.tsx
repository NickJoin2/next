'use client'
import React, {useEffect} from "react";

import Title from "@/shared/ui/Title";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {employeesRead} from "@/features/employees/action/action";
import {studentTable} from "@/features/students/slice/students";
import StudentTable from "@/widgets/studentTable/ui/StudentTable";
import styled from "styled-components";


export default function worker() {
    const dispatch = useAppDispatch();
    const employees = useAppSelector((state: RootState) => state.employees.data);

    useEffect(() => {
        dispatch(employeesRead())
    }, [dispatch]);

    useEffect(() => {
        dispatch(studentTable(employees))
    }, [employees]);

    const Record = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 50px;`

    const theadObj = ['Имя', 'Фамилия', 'Отчество', 'Блокировка', 'Действие',]

    return (
        <section>
            <div className="container">
                <Record>
                    <Title title={'Студенты'} position={'start'}/>
                </Record>

                <StudentTable theadObj={theadObj}/>
            </div>
        </section>
    )

}
