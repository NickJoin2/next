'use client'
import React from 'react';
import Title from "@/shared/ui/Title";
import './styles.scss'
import {MainBlock} from "@/widgets/mainBlock";
import img1 from "@/shared/image/map/1.jpg";
import img2 from "@/shared/image/map/2.jpg";
import img3 from "@/shared/image/map/3.jpg";
import img4 from "@/shared/image/map/4.jpg";
import img5 from "@/shared/image/map/5.jpg";

const Control = () => {
    return (
        <section className="control">
            <div className="container">
                <div className="control-title">
                    <Title title={'Управление'}/>
                </div>

                <ul className="control__list">
                    <MainBlock img={img1} gridColumn={'1 / 2'} gridRow={'1 / 12'} text={'Управление дисциплинами'}
                               mapLink={'control/disciplines'}/>
                    <MainBlock img={img2} gridColumn={'2 / 2'} gridRow={'1 / 8'} text={'Студенты группы'}
                               mapLink={'control/students'}/>
                    <MainBlock img={img3} gridColumn={'1 / 2'} gridRow={'14 / 34'} text={'Управление специализацией'}
                               mapLink={'control/specializations'}/>
                    <MainBlock img={img4} gridColumn={'2 / 2'} gridRow={'10 / 24'} text={'Управление сотрудниками'}
                               mapLink={'control/worker'}/>
                    <MainBlock img={img5} gridColumn={'2 / 2'} gridRow={'26 / 34'} text={'Управление группами'}
                               mapLink={'control/groups'}/>
                </ul>

            </div>
        </section>
    );
};

export default Control;