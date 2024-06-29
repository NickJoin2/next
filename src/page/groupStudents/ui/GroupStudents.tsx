'use client'
import React, {FormEvent, useEffect} from 'react';

import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import Title from "@/shared/ui/Title";
import {GroupStudentsFind} from "@/page/groupStudentsFind";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {setGroup} from "@/features/group/slice/group";
import {groupRead} from "@/features/group/action/action";
import {useRouter} from "next/navigation";
import {BreadCrumbs} from "@/features/breadCrumbs";


const ControlGroup = () => {
    const data = useAppSelector((state:RootState) => state.group.data)

    const dispatch = useAppDispatch();
    const router = useRouter();

    const breadCrumb = {
        '/': 'Главная',
        '/control': 'Контроль',
        '/control/students': 'Студенты - Группы',
    };

    useEffect(() => {
        dispatch(groupRead())
    }, [dispatch]);

    useEffect(() => {
        dispatch(setGroup(data));
    }, [data, dispatch]);

    const handleRedirect = (e:FormEvent) => {
        e.preventDefault()
        router.push("/control/groups");
    }

    return (
        <section>
            <div className="container">

                <div className='record'>
                    <div>
                        <Title title={'Группы - Студенты'} position={'start'}/>
                        <BreadCrumbs breadCrumb={breadCrumb}/>
                    </div>


                    <form onSubmit={handleRedirect}>
                        <ButtonAuth title={'Управление группами'} hover={true} width={255} height={65}
                                    margin={'0 0 0 0'}/>
                    </form>

                </div>

                <GroupStudentsFind/>
            </div>
        </section>
    )

}

export default ControlGroup;