import React, {Dispatch, useEffect, useState} from 'react';

import '@/widgets/specializationsModalCreate/ui/styles.scss'
import 'react-toastify/dist/ReactToastify.css';
import close from "@/shared/image/modal/close.svg";
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import {DisciplineDTO} from "@/features/types";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import Image from "next/image";
import {setCreateCardDisciplines, updateTableDataDisciplines} from "@/features/disciplines/slice/disciplines";
import {disciplinesCreate, disciplinesUpdate} from "@/features/disciplines/action/action";


interface WorkerCreateModalProps {
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedItem?: any;
}

const DisciplinesModalCreate: React.FC<WorkerCreateModalProps> =
    ({
         setOpen,
         selectedItem,
     }) => {
        const [name, setName] = useState<string>(selectedItem && selectedItem.name || '');

        const tableData = useAppSelector((state: RootState) => state.disciplines.cardDisciplines)

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

            dispatch(setCreateCardDisciplines(newEntry));
            dispatch(disciplinesCreate(Entry))
            setOpen(false);
        }


        const submitEdit = (e: React.FormEvent) => {
            e.preventDefault();

            if (!tableData || !selectedItem) {
                return;
            }

            tableData.map((item:DisciplineDTO) => {
                if (item.id === selectedItem.id) {
                    dispatch(updateTableDataDisciplines({
                        id: item.id,
                        name: name
                    }));

                    const disciplinesId = item.id
                    dispatch(disciplinesUpdate({disciplinesId, name}))
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

                            <h2 className="specialization__modal__title">{selectedItem ? 'Редактировать дисциплину' : 'Добавить дисциплину'}</h2>

                            <div className="specialization__modal__form__content">
                                <div className="specialization__modal-block">
                                    <input
                                        required
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="specialization__modal__input"
                                        type="text"
                                        placeholder="Введите название дисциплины"
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

export default DisciplinesModalCreate;