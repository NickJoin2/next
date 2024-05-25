'use client'
import React from 'react';
import {MainBlock} from "@/widgets/mainBlock";
import './styles/styles.scss'
import one from '@/shared/image/mainBlock/1.png'
import two from '@/shared/image/mainBlock/2.png'
import four from '@/shared/image/mainBlock/4.png'

const Page = () => {
    return (
        <div className="map">
            <div className="container">
                <h2 className='map__title'>Карта сайта</h2>

                <ul className="map__list">
                    <MainBlock title={'Выпускники'} img={one}/>
                    <MainBlock title={'Управление'} img={two}/>
                    <MainBlock title={'Курсовые и дипломные работы'} img={four}/>
                </ul>

            </div>
        </div>
    );
};

export default Page;