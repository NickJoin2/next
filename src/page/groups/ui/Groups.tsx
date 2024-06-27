import React, {useEffect, useState} from "react";

import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import Title from "@/shared/ui/Title";
import {GroupModalCreate} from "@/widgets/groupModalCreate";
import {GroupCard} from "@/widgets/groupCard";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {setGroup} from "@/features/group/slice/group";
import {groupRead} from "@/features/group/action/action";


const ControlGroup = () => {
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    const data = useAppSelector((state: RootState) => state.group.data)

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(groupRead())
    }, [dispatch]);

    useEffect(() => {
        dispatch(setGroup(data));
    }, [data, dispatch]);


    return (
        <section>
            <div className="container">

                <div className="record">
                    <Title title={'Группы'} position={'start'}/>

                    <ButtonAuth title={'Создать группу'} anim={true} width={255} height={65}
                                setOpen={setCreateModalOpen}
                                margin={'0 0 0 0'}/>
                </div>

                <GroupCard/>

                {
                    createModalOpen && <GroupModalCreate setOpen={setCreateModalOpen}/>
                }

            </div>

        </section>
    )

}

export default ControlGroup;