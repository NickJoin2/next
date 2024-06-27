'use client'
import React, {useEffect, useState} from "react";


import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import Title from "@/shared/ui/Title";
import {GroupCreateModal} from "@/widgets/groupModalCreate";
import {StudentGroup} from "@/widgets/studentGroup";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {setGroup} from "@/features/group/slice/group";
import {groupRead} from "@/features/group/action/action";

const ControlGroupStudent = ({ params }: { params: any }) => {
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const dispatch = useAppDispatch();

    const data = useAppSelector((state:RootState) => state.group.data)

    const { groupId } = params;

    useEffect(() => {
        dispatch(groupRead())
    }, []);

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

                <div className='record'>
                    <Title title={name} position={'start'}/>
                    <ButtonAuth title={'Создать студента'} anim={true} width={255} height={65} setOpen={setCreateModalOpen}
                                margin={'0 0 0 0'}/>
                </div>

                <StudentGroup groupId={groupId}/>

                {
                    createModalOpen && <GroupCreateModal setOpen={setCreateModalOpen}/>
                }
            </div>
        </section>
    )

}

export default ControlGroupStudent;