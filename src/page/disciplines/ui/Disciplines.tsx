'use client'
import React, {useEffect, useState} from "react";

import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import Title from "@/shared/ui/Title";
import {DisciplinesCard} from "@/widgets/disciplinesCard";
import {DisciplinesCreateModal} from "@/widgets/disciplinesCreateModal";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {setCardDisciplines} from "@/features/disciplines/slice/disciplines";
import {disciplinesRead} from "@/features/disciplines/action/action";
import {BreadCrumbs} from "@/features/breadCrumbs";

interface DisciplinesProps {
    breadCrumb: { [key: string]: string };
}

const ControlSpecializations = ({breadCrumb}:DisciplinesProps) => {
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const data = useAppSelector((state:RootState) => state.disciplines.data)

    useEffect(() => {
        dispatch(disciplinesRead())
    }, [dispatch]);

    useEffect(() => {
        dispatch(setCardDisciplines(data));
    }, [data, dispatch]);


    return (
        <section>
            <div className="container">


                <div className='record'>
                    <div className="block">
                        <Title title={'Дисциплины'} position={'start'}/>
                        <BreadCrumbs breadCrumb={breadCrumb}/>
                    </div>

                    <ButtonAuth title={'Создать дисциплину'} anim={true} width={255} height={65} setOpen={setCreateModalOpen}
                                margin={'0 0 0 0'}/>
                </div>

                <DisciplinesCard/>

                {
                    createModalOpen && <DisciplinesCreateModal setOpen={setCreateModalOpen} />
                }

            </div>

        </section>
    )

}

export default ControlSpecializations;