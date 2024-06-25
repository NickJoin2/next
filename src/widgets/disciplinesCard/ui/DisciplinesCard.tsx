import React, {useEffect, useState} from 'react';
import '@/widgets/specializationCard/ui/styles.scss'

import NoRecords from "@/shared/ui/NoRecords";
import editImg from "@/shared/image/table-button/edit.svg";
import deleteImg from "@/shared/image/table-button/delete.svg";
import assignImg from "@/shared/image/table-button/assign.svg";

import AssentModal from "@/widgets/modal/assent/ui/AssentModal";
import {specializationsDelete} from "@/features/specializations/action/action";
import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {setAssentModal} from "@/features/other/slice/other";
import {setCardSpecializations} from "@/features/specializations/slice/specialization";
import Image from "next/image";
import SpecializationsModalCreate from "@/widgets/specializationsModalCreate/ui/SpecializationsModalCreate";
import {SpecializationDTO} from "@/features/types";
import {disciplinesDelete} from "@/features/disciplines/action/action";
import {setCardDisciplines} from "@/features/disciplines/slice/disciplines";
import DisciplinesModalCreate from "@/widgets/disciplinesCreateModal/ui/DisciplinesCreateModal";
import {green} from "next/dist/lib/picocolors";
import DisciplinesModalAssign from "@/widgets/disciplinesModalAssign/ui/DisciplinesModalAssign";



const DisciplinesCard = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const assentModal = useAppSelector((state: RootState) => state.other.assentModal);
    const [confirm, setConfirm] = useState<string>('')
    const [dataTable, setDataTable] = useState<SpecializationDTO[]>([]);
    const [assignOpen, setAssignOpen] = useState<boolean>(false);


    const dispatch = useAppDispatch();
    const data = useAppSelector((state:RootState) => state.disciplines.cardDisciplines)

    useEffect(() => {
        setDataTable(data)
    }, [data]);

    const handleEdit = (id: string) => {
        setOpen(true);

        const item:any = data.find(item => item.id === id);
        setSelectedItemId(item);
    }

    const handleDelete = (e: React.FormEvent, id: string) => {
        e.preventDefault()
        dispatch(setAssentModal(true))
        setConfirm(id)
    };

    const submitGreen = async(e: React.FormEvent) => {
        e.preventDefault();

        const disciplinesId = confirm
        dispatch(disciplinesDelete({disciplinesId}))
        dispatch(setCardDisciplines(data.filter((item) => item.id !== confirm)))

        dispatch(setAssentModal(false))
    };

    const submitRed = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(setAssentModal(false))
    }

    const handleAssign = (id: string) => {
        setAssignOpen(true);
        const item:any = data.find(item => item.id === id);
        setSelectedItemId(item);
    }



    return (
        <>
            <div className="container">
                <ul className="specializations__list">
                    {Array.isArray(dataTable) && dataTable.length !== 0 ? (
                        dataTable.map(item => (
                            <li className="specializations__item" key={item.id}>
                                <p className="specializations__title">{item.name}</p>
                                <div className="specializations__button">
                                    <Image onClick={(e) => handleDelete(e, item.id)} src={deleteImg}
                                           alt='delete'/>
                                    <Image onClick={() => handleEdit(item.id)} src={editImg}
                                           alt="edit"/>
                                    <Image onClick={() => handleAssign(item.id)} width={19} src={assignImg}
                                           alt="assign"/>

                                </div>
                            </li>
                        ))
                    ) : (
                        <NoRecords title={'Нет дисциплин'}/>
                    )}

                    {
                        open && <DisciplinesModalCreate setOpen={setOpen} selectedItem={selectedItemId} />
                    }

                    {
                        assentModal && <AssentModal title={'Вы уверены что хотите удалить дисциплину?'}
                                                    submitGreen={submitGreen} submitRed={submitRed}/>
                    }

                    {
                        assignOpen && <DisciplinesModalAssign setOpen={setAssignOpen} selectedItem={selectedItemId} />
                    }

                </ul>
            </div>
        </>
    );
};

export default DisciplinesCard;