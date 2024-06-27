import React from 'react';
import Image from "next/image";

import './styles.scss'

import Title from "@/shared/ui/Title";
import SecondText from "@/shared/ui/SecondText";
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

import img from '@/shared/image/user/user-office.svg'


const Office = () => {
    return (
        <section className="office">
            <div className="container">

                <div className='office__title'>
                    <Title title="Личный кабинет"/>
                </div>

                <div className="office__wrapper">

                    <div className="office__block">
                        <div className='office__img'>
                            <Image src={img} alt="user"/>
                        </div>
                    </div>

                    <div className="office__block">
                        <h3 className='office__userName'>Оксана Черниюк</h3>
                        <div className="office__border"></div>
                        <div className="office__info">
                            <SecondText title='Статус' text='Заведующая отделением'/>
                            <SecondText title='Адрес электронной почты' text='21is2_23@3@mail.ru'/>
                            <SecondText title='Группы' text='21ИС-2, 23ИС-3, 22ИС-1'/>
                        </div>

                        <div className="office__btn">
                            <ButtonAuth title={'Редактировать'} width={200} height={52} margin={'40px 0 0 0'} hover={true}/>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Office;