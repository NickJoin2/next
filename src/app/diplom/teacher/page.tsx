'use client'
import React from 'react';
import '@/app/diplom/teacher/styles/styles.scss'
import {MainBlock} from "@/widgets/mainBlock";
import plus from "@/shared/image/main-icon/plus.svg";
import history from "@/shared/image/main-icon/history.svg";
import input from "@/shared/image/main-icon/input.svg";

const Page = () => {
    return (
        <div className="diplomP">
            <div className="container">
                <h2 className='diplomP__title'>Дипломные работы</h2>

                <ul className="diplomP__list">
                    <MainBlock title={'Создание дипломной работы'} icon={plus}/>
                    <MainBlock title={'Обновление дипломной работы'} icon={history}/>
                    <MainBlock title={'Выгрузить ведомость распределения работ'} icon={input}/>
                    <MainBlock title={'Выгрузить ведомость итоговых оценок'} icon={input}/>
                </ul>

            </div>
        </div>
    );
};

export default Page;