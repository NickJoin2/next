import React, {Dispatch, FormEvent, useState} from 'react';
import '@/widgets/studentCursovikCreate/ui/styles.scss'
import Image from "next/image";

import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

import {Person} from "@/features/types";
import {useAppDispatch} from "@/app/store/appStore";
import {studentCreateDiplom, studentReplaceDiplom} from "@/features/studentD/action/action";
import {setTableDataCreateStudentDiplom, updateTableDataStudentDiplom} from "@/features/studentD/slice/studentD";

import close from '@/shared/image/modal/close.svg'

interface DiplomCreateModalProps {
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedItem?: Person | null
}

const DiplomCreateModal: React.FC<DiplomCreateModalProps> = ({setOpen, selectedItem}) => {
    const id:string | undefined = selectedItem?.id
    const [title, setTitle] = useState<string>(selectedItem && selectedItem.title || '');
    const [fio, setFio] = useState<string>(selectedItem && selectedItem.fio || '')
    const [prepodFio, setPrepodFio] = useState<string>(selectedItem && selectedItem.prepodFio || '')
    const [level, setLevel] = useState<string>(selectedItem && selectedItem.level || '');
    const [link, setLink] = useState<string>(selectedItem && selectedItem.link || '');


    const dispatch = useAppDispatch()

    const handleClose = () => {
        setOpen(false)
    }

    const createSubmit = (e:FormEvent) => {
        e.preventDefault()

        const newEntry = {
            id: String(new Date().getTime()),
            title: title,
            fio: fio,
            prepodFio: prepodFio,
            level: level,
            link: link
        }

        dispatch(studentCreateDiplom(newEntry))
        dispatch(setTableDataCreateStudentDiplom(newEntry))
        setOpen(false)
    }

    const updateSubmit = (e:FormEvent) => {
        e.preventDefault()
        dispatch(studentReplaceDiplom({id, fio, prepodFio, level, link, title}))
        dispatch(updateTableDataStudentDiplom({id, fio, prepodFio, level, link, title}))

        setOpen(false)
    }


    return (
        <div className="student__modal__overlay">
            <div className="student__modal__content">
                <form className="student__modal__form" onSubmit={selectedItem ? updateSubmit : createSubmit}>
                    <button className="student__modal__close" onClick={handleClose}>
                        <Image src={close.src} alt="close"/>
                    </button>

                    <h2 className="student__modal__title">Создать курсовую</h2>

                    <div className="student__modal__form__content">
                        <div className="student__modal-block">
                            <input
                                value={title}
                                required={true}
                                onChange={e => setTitle(e.target.value)}
                                className="student__modal__input"
                                type="text"
                                placeholder="Введите название проэкта"
                            />
                        </div>

                        <div className="student__modal-block">
                            <input
                                value={fio}
                                required={true}
                                onChange={e => setFio(e.target.value)}
                                className="student__modal__input"
                                type="text"
                                placeholder="Введите ФИО"
                            />
                        </div>

                        <div className="student__modal-block">
                            <input
                                value={prepodFio}
                                required={true}
                                onChange={e => setPrepodFio(e.target.value)}
                                className="student__modal__input"
                                type="text"
                                placeholder="Введите ФИО преподавателя"
                            />
                        </div>

                        <div className="student__modal-block">
                            <input
                                value={link}
                                required={true}
                                onChange={e => setLink(e.target.value)}
                                className="student__modal__input"
                                type="text"
                                placeholder="Ссылка на проэкт"
                            />
                        </div>

                        <div className="student__modal-block">
                            <select
                                className='student__modal__select'
                                required={true}
                                onChange={e => setLevel(e.target.value)}
                                value={level}>
                                <option value="1">Не начат</option>
                                <option value="2">В процессе</option>
                                <option value="3">Завершен</option>
                            </select>
                        </div>
                    </div>

                    <div className="student__modal-block-button">
                        <ButtonAuth title={'Добавить'} hover={true} width={178} height={65}
                                    margin={'0 0 0 0'}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DiplomCreateModal;