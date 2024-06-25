'use client'
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

import styled from "styled-components";
import React, {useEffect, useState} from "react";

import Title from "@/shared/ui/Title";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {specializationsRead} from "@/features/specializations/action/action";
import {setCardSpecializations} from "@/features/specializations/slice/specialization";
import GroupCreateModal from "@/widgets/groupModalCreate/ui/GroupModalCreate";
import GroupCard from "@/widgets/groupCard/ui/GroupCard";
import {setGroup} from "@/features/group/slice/group";
import {groupRead} from "@/features/group/action/action";


const ControlGroup = () => {
    const [open, setOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const data = useAppSelector((state: RootState) => state.group.data)

    useEffect(() => {
        dispatch(groupRead())
    }, []);


    useEffect(() => {
        dispatch(setGroup(data));
    }, [data, dispatch]);


    const Record = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        padding-top: 40px`

    return (
        <section>
            <div className="container">

                <Record>
                    <Title title={'Группы'} position={'start'}/>

                    <ButtonAuth title={'Создать группу'} anim={true} width={255} height={65}
                                setOpen={setCreateModalOpen}
                                margin={'0 0 0 0'}/>
                </Record>

                <GroupCard/>

                {
                    createModalOpen && <GroupCreateModal setOpen={setCreateModalOpen}/>
                }

            </div>

        </section>
    )

}

export default ControlGroup;