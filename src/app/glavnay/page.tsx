'use client'
import React from 'react';
import './styles/styles.scss'
import glavnayImage from "@/shared/image/glavnay/glavnay.png";
import GlavnayFrame from "@/widgets/Glavnay/ui/GlavnayFrame";

const Page = () => {
    return (
        <GlavnayFrame text={'Курсовые и дипломные работы'} img={glavnayImage}/>
    );
};

export default Page;