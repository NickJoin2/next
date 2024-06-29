import React, {Dispatch, useEffect, useState} from 'react';
import Image from "next/image";

import '@/widgets/styles/modal.scss'
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

import {useAppDispatch} from "@/app/store/appStore";
import {groupCreateStudent} from "@/features/group/action/action";

import close from "@/shared/image/modal/close.svg";

interface WorkerCreateModalProps {
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedItem?: any;
    open: boolean;
}

const GroupStudentAddModal: React.FC<WorkerCreateModalProps> =
    ({
         setOpen,
         selectedItem,
        open,
     }) => {
        const [id, setId] = useState<string>(selectedItem);
        const [firstName, setFirstName] = useState<string>('');
        const [middleName, setMiddleName] = useState<string>('');
        const [lastName, setLastName] = useState<string>('');

        useEffect(() => {
            setId(selectedItem);
        }, [selectedItem]);

        const dispatch = useAppDispatch();

        const submitCreate = (e: React.FormEvent) => {
            e.preventDefault();

             dispatch(groupCreateStudent({groupId: id, firstname: firstName, middlename: middleName, lastname: lastName}))

            setFirstName('')
            setMiddleName('')
            setLastName('')
            setOpen(false);
        }

        const handleClose = () => {
            setOpen(false)
        }

        return (
            <>
                <div className={`modalForm__overlay ${open ? 'show' : ''} `}>
                    <div className="modalForm__content">
                        <form className="modalForm__form" onSubmit={submitCreate}>
                            <div className="modalForm__close">
                                <button type="button" onClick={handleClose}>
                                    <Image src={close} alt="close"/>
                                </button>
                            </div>

                            <h2 className="modalForm__title">Создать студента</h2>

                            <div className="modalForm__form__content">
                                <div className="modalForm-block">
                                    <input
                                        required
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        className="modalForm__input"
                                        type="text"
                                    />

                                    <label className='modalForm__label'>Введите имя студента</label>
                                </div>

                                <div className="modalForm-block">
                                <input
                                        required
                                        value={middleName}
                                        onChange={e => setMiddleName(e.target.value)}
                                        className="modalForm__input"
                                        type="text"
                                    />

                                    <label className='modalForm__label'>Введите фамилия студента</label>
                                </div>

                                <div className="modalForm-block">
                                    <input
                                        required
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        className="modalForm__input"
                                        type="text"
                                    />
                                    <label className='modalForm__label'>Введите отчество студента</label>
                                </div>

                            </div>

                            <div className="modalForm-block-button">
                                <ButtonAuth title="Сохранить" width={128} height={52} hover={true}/>
                            </div>

                        </form>
                    </div>
                </div>
            </>
        );
    };

export default GroupStudentAddModal;