import React, {useState} from 'react';
import Image from "next/image";

import '@/widgets/specializationCard/ui/styles.scss'

import NoRecords from "@/shared/ui/NoRecords";
import {AssentModal} from "@/widgets/assentModal";
import {DisciplinesModalCreate} from "@/widgets/disciplinesCreateModal";
import {DisciplinesModalAssign} from "@/widgets/disciplinesModalAssign";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {DisciplineDTO} from "@/features/types";
import {setAssentModal} from "@/features/other/slice/other";
import {disciplinesDelete} from "@/features/disciplines/action/action";
import {disciplinesModalAssign, setCardDisciplines} from "@/features/disciplines/slice/disciplines";

import editImg from "@/shared/image/table-button/edit.svg";
import deleteImg from "@/shared/image/table-button/delete.svg";
import assignImg from "@/shared/image/table-button/assign.svg";


const DisciplinesCard = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<DisciplineDTO | null>(null);
    const [disciplinesId, setDisciplinesId] = useState<string>('')

    const dataDisciplines = useAppSelector((state: RootState) => state.disciplines.cardDisciplines)
    const assentModal = useAppSelector((state: RootState) => state.other.assentModal);
    const assignOpen = useAppSelector((state: RootState) => state.disciplines.disciplinesModalAssign)

    const dispatch = useAppDispatch();


    const handleEdit = (id: string) => {
        setOpen(true);
        setSelectedItemId(dataDisciplines.find(item => item.id === id) || null);
    }

    const handleDelete = (id: string) => {
        dispatch(setAssentModal(true))
        setDisciplinesId(id)
    };

    const submitGreen = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(disciplinesDelete({disciplinesId}))
        dispatch(setCardDisciplines(dataDisciplines.filter((item) => item.id !== disciplinesId)))
        dispatch(setAssentModal(false))
    };

    const submitRed = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(setAssentModal(false))
    }

    const handleAssign = (id: string) => {
        dispatch(disciplinesModalAssign(true));
        setSelectedItemId(dataDisciplines.find(item => item.id === id) || null);
    }

    return (
        <>
            <div className="container">
                <ul className="specializations__list">
                    {dataDisciplines && dataDisciplines.length !== 0 ? (
                        dataDisciplines.map((item:DisciplineDTO) => (
                            <li className="specializations__item" key={item.id}>
                                <p className="specializations__title">{item.name}</p>
                                <div className="specializations__button">
                                    <button onClick={() => handleDelete(item.id)}>
                                        <Image src={deleteImg} alt='delete'/>
                                    </button>

                                    <button onClick={() => handleEdit(item.id)}>
                                        <Image src={editImg} alt="edit"/>
                                    </button>

                                    <button onClick={() => handleAssign(item.id)}>
                                        <Image width={19} src={assignImg}
                                               alt="assign"/>
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <NoRecords title={'Нет дисциплин'}/>
                    )}

                    {
                        open && <DisciplinesModalCreate setOpen={setOpen} selectedItem={selectedItemId}/>
                    }

                    {
                        assentModal && <AssentModal title={'Вы уверены что хотите удалить дисциплину?'}
                                                    submitGreen={submitGreen} submitRed={submitRed}/>
                    }

                    {
                        assignOpen && <DisciplinesModalAssign selectedItem={selectedItemId}/>
                    }

                </ul>
            </div>
        </>
    );
};

export default DisciplinesCard;
