'use client'
import React from 'react';
import {MainBlock} from "@/widgets/mainBlock";
import './styles/styles.scss'
import eye from "@/shared/image/main-icon/eye.svg";
import input from "@/shared/image/main-icon/input.svg";

const Page = () => {
    return (
        <div className="cursachS">
            <div className="container">
                <h2 className='cursachS__title'>Курсовые работы</h2>

                <ul className="cursachS__list">
                    <MainBlock title={'Просмотр этапов курсовой работы'} icon={eye}/>
                    <MainBlock title={'Отправление задания на проверку'} icon={input}/>
                    <MainBlock title={'Повторное отправление задания на проверку'} icon={input}/>
                </ul>

            </div>
        </div>
    );
};

export default Page;