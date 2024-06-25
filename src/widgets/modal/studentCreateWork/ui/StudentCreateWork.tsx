import React, { Dispatch, useState } from 'react';
import Image from 'next/image';
import close from '@/shared/image/modal/close.svg';
import ButtonAuth from '@/features/buttonAuth/ui/ButtonAuth';
import '../styles/styles.scss';
import {Person} from "@/app/types";

const StudentWork = ({ setOpen, setTableData }: {
    tableData: Person[];
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    setTableData: Dispatch<React.SetStateAction<Person[]>>;
}) => {
    const [fio, setFio] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [progress, setProgress] = useState<string>('');
    const [level, setLevel] = useState<string>('');

    const handleClose = () => {
        setOpen(false);
    };


    const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLevel(e.target.value);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setTableData(prevState => [...prevState, {id: new Date().getTime(),fio: fio, title: title, progress: progress, level: level}] as Person[]);
        setOpen(false);
    };

    return (
            <div className="modal__overlay">
                <div className="modal__content">
                    <form className="modal__form" onSubmit={submit}>
                        <div className="modal__close">
                            <button type="button" onClick={handleClose}>
                                <Image src={close} alt="close" />
                            </button>
                        </div>

                        <h2 className="modal__title">Создать работу</h2>

                        <div className="modal__form__content">
                            <div className="modal-block">
                                <input
                                    required
                                    value={fio}
                                    onChange={e => setFio(e.target.value)}
                                    className="modal__input"
                                    type="text"
                                    placeholder="Введите ФИО студента"
                                />
                            </div>

                            <div className="modal-block">
                                <input
                                    required
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    className="modal__input"
                                    type="text"
                                    placeholder="Введите название проекта"
                                />
                            </div>

                            <div className="modal-block">
                                <input
                                    required
                                    value={progress}
                                    onChange={e => setProgress(e.target.value)}
                                    className="modal__input"
                                    type="number"
                                    placeholder="Введите прогресс проекта"
                                    min={0}
                                    max={100}
                                />
                            </div>

                            <div className="modal-block">
                                <select name="level" id="level" value={level} onChange={handleLevelChange}>
                                    <option value="1">Не начат</option>
                                    <option value="2">В процессе</option>
                                    <option value="3">Завершен</option>
                                </select>
                            </div>
                        </div>

                        <div className="modal-block-button">
                            <ButtonAuth title="Сохранить" width={128} height={52} hover={true} />
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default StudentWork;