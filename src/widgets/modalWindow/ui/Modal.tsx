

'use client'
import React, { Dispatch, SetStateAction, useState } from 'react';
import close from '@/shared/image/modal/close.svg';
import '../styles/styles.scss';
import emailImg from '@/shared/image/modal/email.svg';
import eye from '@/shared/image/modal/eye.password.svg';
import Image from "next/image";
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import {useAppDispatch} from "@/app/store/appStore";
import {fetchRegister} from "@/features/userAuthorization/slice/registerSlice";
// import { fetchRegister } from "@/features/userAuthorization/slice/registerSlice";
// import { useAppDispatch } from "@/app/store/appStore";

const Modal = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleVisibility = () => {
        setVisible(!visible);
    };

    const dispatch = useAppDispatch();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(fetchRegister({ email, password }));
    };

    return (
        open && (
            <div className="modal__overlay">
                <div className="container">
                    <div className="modal__content">
                        <form className="modal__form" onSubmit={handleSubmit}>
                        {/*<form className="modal__form">*/}
                            <div className="modal__close">
                                <button type="button" onClick={handleClose}>
                                    <Image src={close} alt="close" />
                                </button>
                            </div>

                            <h2 className="modal__title">Авторизация</h2>

                            <div className="modal__form__content">
                                <div className="modal-block">
                                    <label className="modal__label" htmlFor="email">Введите почту</label>
                                    <div className="modal-block">
                                        <input
                                            className="modal__input"
                                            onChange={e => setEmail(e.target.value)}
                                            type="text"
                                            id="email"
                                            placeholder="Email"
                                        />
                                        <Image className="modal__input-img" src={emailImg} alt="emails" />
                                    </div>
                                </div>

                                <div className="modal-block">
                                    <label className="modal__label" htmlFor="password">Введите пароль</label>
                                    <div className="modal-block">
                                        <input
                                            className="modal__input"
                                            onChange={e => setPassword(e.target.value)}
                                            type={visible ? 'text' : 'password'}
                                            id="password"
                                            placeholder="Пароль"
                                        />
                                        <button
                                            type="button"
                                            className="modal__input-img"
                                            onClick={handleVisibility}
                                        >
                                            <Image src={eye} alt="eye" />
                                            {visible && <div className="modal__input-img-eyeClose"></div>}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-block-button">
                                <ButtonAuth title="Войти" width={128} height={52} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default Modal;