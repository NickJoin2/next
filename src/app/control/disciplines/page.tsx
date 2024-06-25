'use client'
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

import styled from "styled-components";
import React, {useEffect, useState} from "react";

import Title from "@/shared/ui/Title";

import SpecializationCard from "@/widgets/specializationCard/ui/SpecializationCard";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {specializationsRead} from "@/features/specializations/action/action";
import {setCardSpecializations} from "@/features/specializations/slice/specialization";
import SpecializationsModalCreate from "@/widgets/specializationsModalCreate/ui/SpecializationsModalCreate";
import DisciplinesModalCreate from "@/widgets/disciplinesCreateModal/ui/DisciplinesCreateModal";
import DisciplinesCard from "@/widgets/disciplinesCard/ui/DisciplinesCard";
import {setCardDisciplines} from "@/features/disciplines/slice/disciplines";
import {disciplinesRead} from "@/features/disciplines/action/action";


const ControlSpecializations = () => {
    const [open, setOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const data = useAppSelector((state:RootState) => state.disciplines.data)
    // const tableData = useAppSelector((state:RootState) => state.disciplines.cardDisciplines)


    useEffect(() => {
        dispatch(disciplinesRead())
    }, [dispatch]);

    useEffect(() => {
        dispatch(setCardDisciplines(data));
    }, [data, dispatch]);




    const Record = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;`


    return (
        <section>
            <div className="container">

                <Record>
                    <div className="block">
                        <Title title={'Дисциплины'} position={'start'}/>
                    </div>

                    <ButtonAuth title={'Создать дисциплину'} anim={true} width={255} height={65} setOpen={setCreateModalOpen}
                                margin={'40px 0 0 0'}/>

                </Record>

                <DisciplinesCard/>

                {
                    createModalOpen && <DisciplinesModalCreate setOpen={setCreateModalOpen} />
                }

            </div>

        </section>
    )

}

export default ControlSpecializations;