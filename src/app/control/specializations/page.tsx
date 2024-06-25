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


const ControlSpecializations = () => {
    const [open, setOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const data = useAppSelector((state:RootState) => state.specialization.data)
    const tableData = useAppSelector((state:RootState) => state.specialization.tableCardSpecializations)


    useEffect(() => {
        dispatch(specializationsRead())
    }, [dispatch]);

    useEffect(() => {
        dispatch(setCardSpecializations(data));
    }, [data, dispatch]);

    useEffect(() => {
        console.log(tableData)
    }, [tableData]);



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
                        <Title title={'Специализации'} position={'start'}/>
                    </div>

                    <ButtonAuth title={'Создать специализацию'} anim={true} width={255} height={65} setOpen={setCreateModalOpen}
                                margin={'40px 0 0 0'}/>

                </Record>

                <SpecializationCard/>
                {/*<TableDiplomStudents theadObj={theadObj} teacher={false}/>*/}

                {
                    createModalOpen && <SpecializationsModalCreate setOpen={setCreateModalOpen} />
                }

            </div>

        </section>
    )

}

export default ControlSpecializations;