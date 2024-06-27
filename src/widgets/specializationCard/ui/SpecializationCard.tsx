import React, {useState} from 'react';
import Image from "next/image";

import './styles.scss'

import NoRecords from "@/shared/ui/NoRecords";
import {SpecializationsModalCreate} from "@/widgets/specializationsModalCreate";
import {AssentModal} from "@/widgets/assentModal";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {SpecializationDTO} from "@/features/types";
import {setCardSpecializations} from "@/features/specializations/slice/specialization";
import {setAssentModal} from "@/features/other/slice/other";
import {specializationsDelete} from "@/features/specializations/action/action";

import editImg from "@/shared/image/table-button/edit.svg";
import deleteImg from "@/shared/image/table-button/delete.svg";


const SpecializationCard = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<SpecializationDTO | null>(null);
    const [specializationId, setSpecializationId] = useState<string>('')

    const dataSpecializations = useAppSelector((state:RootState) => state.specialization.tableCardSpecializations)
    const assentModal = useAppSelector((state: RootState) => state.other.assentModal);

    const dispatch = useAppDispatch();


    const handleEdit = (id: string) => {
        setSelectedItemId(dataSpecializations.find(item => item.id === id) || null);
        setOpen(true);
    }

    const handleDelete = (e: React.FormEvent, id: string) => {
        e.preventDefault()
        dispatch(setAssentModal(true))
        setSpecializationId(id)
    };

    const submitGreen = async(e: React.FormEvent) => {
        e.preventDefault();

        dispatch(specializationsDelete({specializationId}))
        dispatch(setCardSpecializations(dataSpecializations.filter((item) => item.id !== specializationId)))
        dispatch(setAssentModal(false))
    };

    const submitRed = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(setAssentModal(false))
    }


    return (
        <>
            <div className="container">
                <ul className="specializations__list">

                    {dataSpecializations && dataSpecializations.length !== 0 ? (
                        dataSpecializations.map(item => (
                            <li className="specializations__item" key={item.id}>
                                <p className="specializations__title">{item.name}</p>
                                <div className="specializations__button">
                                    <Image onClick={(e) => handleDelete(e, item.id)} src={deleteImg}
                                           alt='delete'/>
                                    <Image onClick={() => handleEdit(item.id)} src={editImg}
                                           alt="edit"/>
                                </div>
                            </li>
                        ))
                    ) : (
                        <NoRecords title={'Нет специализаций'}/>
                    )}

                    {
                        open && <SpecializationsModalCreate setOpen={setOpen} selectedItem={selectedItemId} />
                    }

                    {
                        assentModal && <AssentModal title={'Вы уверены что хотите удалить специализацию?'}
                                                    submitGreen={submitGreen} submitRed={submitRed}/>
                    }

                </ul>
            </div>
        </>
    );
};

export default SpecializationCard;