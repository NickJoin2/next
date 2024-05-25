'use client'
import React from 'react';
import {MainBlock} from "@/widgets/mainBlock";
import eye from "@/shared/image/main-icon/eye.svg";
import input from "@/shared/image/main-icon/input.svg";
import '@/app/diplom/student/styles/styles.scss'

const Page = () => {
    return (
        <div className="diplomS">
            <div className="container">
                <h2 className='diplomS__title'>Дипломные работы</h2>

                <ul className="diplomS__list">
                    <MainBlock title={'Просмотр этапов дипломной работы'} icon={eye}/>
                    <MainBlock title={'Отправление задания на проверку'} icon={input}/>
                    <MainBlock title={'Повторное отправление задания на проверку'} icon={input}/>
                </ul>

            </div>
        </div>
    );
};

export default Page;