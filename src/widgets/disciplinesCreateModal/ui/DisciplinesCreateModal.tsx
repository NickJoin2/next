import React, { Dispatch, useEffect, useState } from 'react';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';

import '@/widgets/styles/modal.scss';

import ButtonAuth from '@/features/buttonAuth/ui/ButtonAuth';

import { RootState, useAppDispatch, useAppSelector } from '@/app/store/appStore';
import { DisciplineDTO } from '@/features/types';
import { setCreateCardDisciplines, updateTableDataDisciplines } from '@/features/disciplines/slice/disciplines';
import { disciplinesCreate, disciplinesUpdate } from '@/features/disciplines/action/action';

import close from '@/shared/image/modal/close.svg';

interface WorkerCreateModalProps {
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedItem?: DisciplineDTO | null;
    open: boolean;
}

const DisciplinesCreateModal: React.FC<WorkerCreateModalProps> = ({ setOpen, selectedItem, open }) => {
    const [name, setName] = useState<string>(''); // Initialize name as an empty string


    useEffect(() => {
        if (selectedItem) {
            setName(selectedItem.name);
        } else {
            setName('');
        }
    }, [selectedItem]);

    const tableData = useAppSelector((state: RootState) => state.disciplines.cardDisciplines);
    const dispatch = useAppDispatch();

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setCreateCardDisciplines({ id: String(new Date().getTime()), name: name }));
        dispatch(disciplinesCreate({ name }));
        setOpen(false);
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!tableData || !selectedItem) return;
        const itemToUpdate = tableData.find((item: DisciplineDTO) => item.id === selectedItem.id);
        if (itemToUpdate) {
            dispatch(updateTableDataDisciplines({ id: itemToUpdate.id, name: name }));
            dispatch(disciplinesUpdate({ disciplinesId: itemToUpdate.id, name }));
        }
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={`modalForm__overlay ${open ? 'show' : ''}`}>
            <div className="modalForm__content">
                <form className="modalForm__form" onSubmit={selectedItem ? submitEdit : submitCreate}>
                    <div className="modalForm__close">
                        <button type="button" onClick={handleClose}>
                            <Image src={close} alt="close" />
                        </button>
                    </div>
                    <h2 className="modalForm__title">{selectedItem ? 'Редактировать дисциплину' : 'Добавить дисциплину'}</h2>
                    <div className="modalForm__form__content">
                        <div className="modalForm-block">
                            <input
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="modalForm__input"
                                type="text"
                            />
                            <label className="modalForm__label">Введите название дисциплины</label>
                        </div>
                    </div>
                    <div className="modalForm-block-button">
                        <ButtonAuth title="Сохранить" width={128} height={52} hover={true} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DisciplinesCreateModal;