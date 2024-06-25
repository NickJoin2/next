'use client'
import ModalPostDisciplines from "@/widgets/modal/postDisciplines/ui/ModalPostDisciplines";
import {useState} from "react";
import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
// import {disciplinesDelete, disciplinesRead} from "@/features/disciplines/actions/actions";
// import ModalUpdateDisciplines from "@/widgets/modal/updateDisciplines/ui/ModalUpdateDisciplines";
// import {createAsyncThunk} from "@reduxjs/toolkit";
// import Title from "@/shared/ui/Title";
// import SecondText from "@/shared/ui/SecondText";
// import Table from "@/widgets/Table/ui/Table";
// import StudentWork from "@/widgets/modal/studentWork/ui/StudentWork";
// import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
// import styled from "styled-components";


function Test() {
    const [openPostDisciplines, setOpenPostDisciplines] = useState<boolean>(false);
    const [openUpdateDisciplines, setOpenUpdateDisciplines] = useState<boolean>(false);
    const [openEmployees, setOpenEmployees] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const state = useAppSelector((state: RootState) => state.disciplines.data);


    const read = () => {
        // dispatch(disciplinesRead());
    }



    // const disciplinesId = '42d14d59-ac87-42e3-925b-11dd0c9b1d29'

    // const deletes = () => {
    //     dispatch(disciplinesDelete({disciplinesId}))
    // }



    return (
        <>
            {/*<div>*/}
            {/*    <button onClick={() => setOpenPostDisciplines(true)}>Добавить цисциплину</button>*/}
            {/*    <ModalPostDisciplines openPostDisciplines={openPostDisciplines}*/}
            {/*                          setOpenPostDisciplines={setOpenPostDisciplines}/>*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    <button onClick={read}>Получить все дисциплины</button>*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    <button onClick={() => setOpenUpdateDisciplines(true)}>Обновить дисциплину</button>*/}
            {/*    <ModalUpdateDisciplines openUpdateDisciplines={openUpdateDisciplines}*/}
            {/*                            setOpenUpdateDisciplines={setOpenUpdateDisciplines}/>*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    <button onClick={deletes}>Удалить дисциплину</button>*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    <button onClick={() => setOpenEmployees(true)}>Обновить дисциплину</button>*/}
            {/*    <ModalUpdateDisciplines setOpenEmployees={setOpenEmployees}*/}
            {/*                            openEmployess={openEmployess}/>*/}
            {/*</div>*/}





        </>

    )
}

export default Test