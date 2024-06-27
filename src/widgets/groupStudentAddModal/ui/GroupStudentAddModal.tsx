import React, {Dispatch,useState} from 'react';
import Image from "next/image";

import '@/widgets/workerCreateModal/ui/WorkerCreateModal'
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

import {useAppDispatch} from "@/app/store/appStore";
import {groupCreateStudent} from "@/features/group/action/action";

import close from "@/shared/image/modal/close.svg";

interface WorkerCreateModalProps {
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedItem?: any;
}

const GroupStudentAddModal: React.FC<WorkerCreateModalProps> =
    ({
         setOpen,
         selectedItem,
     }) => {
        const [id, setId] = useState<string>(selectedItem);
        const [firstName, setFirstName] = useState<string>('');
        const [middleName, setMiddleName] = useState<string>('');
        const [lastName, setLastName] = useState<string>('');

        const dispatch = useAppDispatch();

        const submitCreate = (e: React.FormEvent) => {
            e.preventDefault();

            dispatch(groupCreateStudent({groupId: id, firstname: firstName, middlename: middleName, lastname: lastName}))

            setOpen(false);
        }

        const handleClose = () => {
            setOpen(false)
        }

        return (
            <>
                <div className="modal__overlay">
                    <div className="modal__content">
                        <form className="modal__form" onSubmit={submitCreate}>
                            <div className="modal__close">
                                <button type="button" onClick={handleClose}>
                                    <Image src={close} alt="close"/>
                                </button>
                            </div>

                            <h2 className="modal__title">Создать студента</h2>

                            <div className="modal__form__content">
                                <div className="modal-block">
                                    <input
                                        required
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        className="modal__input"
                                        type="text"
                                        placeholder="Введите имя студента"
                                    />
                                </div>

                                <div className="modal-block">
                                    <input
                                        required
                                        value={middleName}
                                        onChange={e => setMiddleName(e.target.value)}
                                        className="modal__input"
                                        type="text"
                                        placeholder="Введите фамилия студента"
                                    />
                                </div>

                                <div className="modal-block">
                                    <input
                                        required
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        className="modal__input"
                                        type="text"
                                        placeholder="Введите отчество студента"
                                    />
                                </div>

                            </div>

                            <div className="modal-block-button">
                                <ButtonAuth title="Сохранить" width={128} height={52} hover={true}/>
                            </div>

                        </form>
                    </div>
                </div>
            </>
        );
    };

export default GroupStudentAddModal;