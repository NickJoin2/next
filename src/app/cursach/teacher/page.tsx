import React from 'react';
import {MainBlock} from "@/widgets/mainBlock";
import './styles/styles.scss'
import plus from "@/shared/image/main-icon/plus.svg";
import history from "@/shared/image/main-icon/history.svg";
import input from "@/shared/image/main-icon/input.svg";

const Page = () => {
    return (
        <div className="cursachP">
            <div className="container">
                <h2 className='cursachP__title'>Курсовые работы</h2>

                <ul className="cursachP__list">
                    <MainBlock title={'Создание курсовой работы'} icon={plus}/>
                    <MainBlock title={'Обновление курсовой работы'} icon={history}/>
                    <MainBlock title={'Выгрузить ведомость распределения работ'} icon={input}/>
                    <MainBlock title={'Выгрузить ведомость итоговых оценок'} icon={input}/>
                </ul>

            </div>
        </div>
    );
};

export default Page;