import React, {useEffect, useState} from "react";

import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import Title from "@/shared/ui/Title";
import {SpecializationsModalCreate} from "@/widgets/specializationsModalCreate";
import {SpecializationCard} from "@/widgets/specializationCard";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {specializationsRead} from "@/features/specializations/action/action";
import {setCardSpecializations} from "@/features/specializations/slice/specialization";


const ControlSpecializations = () => {
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    const data = useAppSelector((state:RootState) => state.specialization.data)

    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(specializationsRead())
    }, [dispatch]);

    useEffect(() => {
        dispatch(setCardSpecializations(data));
    }, [data, dispatch]);


    return (
        <section>
            <div className="container">
                <div className="record">
                    <div className="block">
                        <Title title={'Специализации'} position={'start'}/>
                    </div>

                    <ButtonAuth title={'Создать специализацию'} anim={true} width={255} height={65} setOpen={setCreateModalOpen}
                                margin={'0 0 0 0'}/>

                </div>

                <SpecializationCard/>


                {
                    createModalOpen && <SpecializationsModalCreate setOpen={setCreateModalOpen} />
                }

            </div>
        </section>
    )

}

export default ControlSpecializations;