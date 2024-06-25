'use client'
import React, {Dispatch, useEffect, useState} from 'react';
import Image from "next/image";
import close from "@/shared/image/modal/close.svg";
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import '../styles/styles.scss'
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { disciplinesUpdate } from "@/features/disciplines/action/action";

const ModalUpdateDisciplines = ({openUpdateDisciplines, setOpenUpdateDisciplines}:{openUpdateDisciplines?:boolean,setOpenUpdateDisciplines?:Dispatch<React.SetStateAction<boolean>>}) => {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state: RootState) => state.disciplines.state);
    const data = useAppSelector((state: RootState) => state.disciplines.data);

    const disciplinesId = '42d14d59-ac87-42e3-925b-11dd0c9b1d29'
    const [name, setName] = useState<string>('');

    useEffect(() => {
        if (data && state) {
            toast.success('Дисциплина добавлена', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else {
            toast.error('Произошла ошибка', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }, [data]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(disciplinesUpdate({disciplinesId,name}));
        setName('')
    };

    const handleClose = () => {
        if(setOpenUpdateDisciplines) {
            setOpenUpdateDisciplines(false);
        }
    };

    return (
        openUpdateDisciplines &&
        <div className="modal__overlay">
            <ToastContainer />

            <div className="container">
                <div className="modal__content">
                    <form className="modal__form" onSubmit={handleSubmit}>
                        <div className="modal__close">
                            <button type="button" onClick={handleClose}>
                                <Image src={close} alt="close"/>
                            </button>
                        </div>

                        <h2 className="modal__title">Обновить дисциплину</h2>

                        <div className="modal__form__content">
                            <div className="modal-block">
                                <input
                                    required
                                    className="modal__input"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    type="text"
                                    id="email"
                                    placeholder="Введите новое название дисциплины"
                                />
                            </div>
                        </div>

                        <div className="modal-block-button">
                            <ButtonAuth title="Добавить" width={128} height={52}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalUpdateDisciplines;