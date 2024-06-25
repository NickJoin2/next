import React, {Dispatch, useEffect, useState} from 'react';

import './styles.scss'
import 'react-toastify/dist/ReactToastify.css';
import close from "@/shared/image/modal/close.svg";
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import {CreateSpecializationCommand, SpecializationDTO} from "@/features/types";

import {specializationsCreate, specializationsUpdate} from "@/features/specializations/action/action";
import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {
    setCardCreateSpecializations,
    setCardSpecializations,
    updateTableDataSpecialization
} from "@/features/specializations/slice/specialization";
import Image from "next/image";


interface WorkerCreateModalProps {
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedItem?: any;
}

const SpecializationsModalCreate: React.FC<WorkerCreateModalProps> =
    ({
         setOpen,
         selectedItem,
     }) => {
        const [name, setName] = useState<string>(selectedItem && selectedItem.name || '');

        const tableData = useAppSelector((state: RootState) => state.specialization.tableCardSpecializations)

        useEffect(() => {
            console.log(selectedItem);
        }, [selectedItem]);

        const dispatch = useAppDispatch();


        const submitCreate = (e: React.FormEvent) => {
            e.preventDefault();

            const newEntry: any = {
                id: String(new Date().getTime()),
                name: name
            };

            const Entry = {
                name: name
            }


            console.log(newEntry)

            dispatch(setCardCreateSpecializations(newEntry));
            dispatch(specializationsCreate(Entry))
            setOpen(false);
        }

        const submitEdit = (e: React.FormEvent) => {
            e.preventDefault();

            if (!tableData || !selectedItem) {
                return;
            }

            tableData.map((item:SpecializationDTO) => {

                if (item.id === selectedItem.id) {
                    dispatch(updateTableDataSpecialization({
                        id: item.id,
                        name: name
                    }));

                    const specializationId = item.id

                    dispatch(specializationsUpdate({specializationId, name}))
                }

                return item;
            });

            setOpen(false);
        };

        const handleClose = () => {
            setOpen(false)
        }

        return (
            <>
                <div className="specialization__modal__overlay">
                    <div className="specialization__modal__content">

                        <form className="specialization__modal__form" onSubmit={selectedItem ? submitEdit : submitCreate}>
                            <div className="specialization__modal__close">
                                <button type="button" onClick={handleClose}>
                                    <Image src={close} alt="close"/>
                                </button>
                            </div>

                            <h2 className="specialization__modal__title">{selectedItem ? 'Редактировать специализацию' : 'Добавить специализацию'}</h2>

                            <div className="specialization__modal__form__content">
                                <div className="specialization__modal-block">
                                    <input
                                        required
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="specialization__modal__input"
                                        type="text"
                                        placeholder="Введите название специализации"
                                    />
                                </div>


                            </div>

                            <div className="specialization__modal-block-button">
                                <ButtonAuth title="Сохранить" width={128} height={52} hover={true}/>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    };

export default SpecializationsModalCreate;