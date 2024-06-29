import React, {Dispatch, useEffect, useState} from 'react';
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';


import '@/widgets/styles/modal.scss'

import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {DisciplineDTO} from "@/features/types";
import {specializationsCreate, specializationsUpdate} from "@/features/specializations/action/action";
import {
    setCardCreateSpecializations,
    updateTableDataSpecialization
} from "@/features/specializations/slice/specialization";

import close from "@/shared/image/modal/close.svg";

interface WorkerCreateModalProps {
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedItem?: any;
    open: boolean;
}

const SpecializationsModalCreate: React.FC<WorkerCreateModalProps> =
    ({
         setOpen,
         selectedItem,
        open
     }) => {
        const [name, setName] = useState<string>(selectedItem && selectedItem.name || '');

        const tableData = useAppSelector((state: RootState) => state.specialization.tableCardSpecializations)

        const dispatch = useAppDispatch();

        useEffect(() => {
            if(selectedItem) {
                setName(selectedItem.name);
            }
        }, [selectedItem]);

        const submitCreate = (e: React.FormEvent) => {
            e.preventDefault();

            dispatch(setCardCreateSpecializations({id: String(new Date().getTime()), name: name}));
            dispatch(specializationsCreate({name}))
            setOpen(false);
            setName('')
        }

        const submitEdit = (e: React.FormEvent) => {
            e.preventDefault();

            if (!tableData || !selectedItem) return

            const itemUpdate = tableData.find((item: DisciplineDTO) => item.id === selectedItem.id);

            if (itemUpdate) {
                dispatch(updateTableDataSpecialization({id: itemUpdate.id, name: name}))
                dispatch(specializationsUpdate({specializationId: itemUpdate.id, name: name}))
            }

            setOpen(false);
        };

        const handleClose = () => {
            setOpen(false)
            setName('')
        }

        return (
            <>
                <div className={`modalForm__overlay ${open ? 'show' : ''} `}>
                    <div className="modalForm__content">

                        <form className="modalForm__form"
                              onSubmit={selectedItem ? submitEdit : submitCreate}>
                            <div className="modalForm__close">
                                <button type="button" onClick={handleClose}>
                                    <Image src={close} alt="close"/>
                                </button>
                            </div>

                            <h2 className="modalForm__title">{selectedItem ? 'Редактировать специализацию' : 'Добавить специализацию'}</h2>

                            <div className="modalForm__form__content">
                                <div className="modalForm-block">
                                    <input
                                        required
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="modalForm__input"
                                        type="text"
                                    />
                                    <label className="modalForm__label">Введите название специализации</label>
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

export default SpecializationsModalCreate;