'use client'
import Title from "@/shared/ui/Title";
import React, {useState} from "react";
import './style/style.scss'
import {MainBlock} from "@/widgets/mainBlock";
import img1 from '@/shared/image/map/1.jpg'
import img2 from '@/shared/image/map/2.jpg'
import img3 from "@/shared/image/map/3.jpg";
import styled from "styled-components";
import ModalCursachDiplom from "@/widgets/modalCursachDiplom/ui/ModalCursachDiplom";

export default function map() {

    const [open, setOpen] = useState<boolean>(false);


    const Record = styled.div`
        margin-top: 40px;
        margin-bottom: 50px;`

    return (
        <section className="control">
            <div className="container">
                <Record>
                    <Title title={'Карта сайта'}/>
                </Record>

                <div className="map__list">
                    <MainBlock img={img1} gridColumn={'1 / 2'} gridRow={'1 / 12'} text={'Выпускники'}
                               mapLink={'/diplom'}/>
                    <MainBlock img={img2} gridColumn={'2 / 2'} gridRow={'1 / 12'} text={'Управление'}
                               mapLink={'control'}/>
                    <MainBlock img={img3} gridColumn={'1 / 3'} gridRow={'14 / 27'} text={'Студенческие работы'}
                               mapLink={''} setOpen={setOpen}/>
                </div>
            </div>

            {
                open && <ModalCursachDiplom setOpen={setOpen}/>
            }
        </section>
    )
}