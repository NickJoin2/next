import React, {Dispatch, useEffect, useState} from 'react';
import Image from "next/image";

import '@/widgets/styles/modal.scss'
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {SpecializationDTO} from "@/features/types";
import {specializationsRead} from "@/features/specializations/action/action";
import {setGroupCreate, setGroupUpdate} from "@/features/group/slice/group";
import {groupCreate, groupUpdate} from "@/features/group/action/action";

import close from "@/shared/image/modal/close.svg";

interface WorkerCreateModalProps {
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedItem?: any;
    open: boolean;
}

const GroupModalCreate: React.FC<WorkerCreateModalProps> =
    ({
         setOpen,
         selectedItem,
        open,
     }) => {
        const [nameGroup, setNameGroup] = useState<string>(selectedItem && selectedItem.name || '');
        const [specializationId, setSpecializationId] = useState<string>(selectedItem && selectedItem.specializationId || '');

        const specializations: SpecializationDTO[] = useAppSelector((state: RootState) => state.specialization.data)
        const group = useAppSelector((state: RootState) => state.group.groupCard)

        const dispatch = useAppDispatch();


        useEffect(() => {
            if (selectedItem) {
                setNameGroup(selectedItem.name)
                setSpecializationId(selectedItem.specializationId)
            } else {
                setNameGroup('');
                setSpecializationId('');
            }
        }, [selectedItem]);

        useEffect(() => {
            dispatch(specializationsRead())
        }, [dispatch]);

        const submitCreate = (e: React.FormEvent) => {
            e.preventDefault();

            dispatch(setGroupCreate({id: String(new Date().getTime()),name: nameGroup,specializationId: specializationId}))
            dispatch(groupCreate({name: nameGroup,specializationId: specializationId}))
            setOpen(false);
        }


        const submitEdit = (e: React.FormEvent) => {
            e.preventDefault();

            if (!group || !selectedItem) return

            const findGroups = group.find(item => item.id === selectedItem.id);

            if(findGroups) {
                dispatch(setGroupUpdate({groupId: findGroups.id, name: nameGroup, specializationId: specializationId}));
                dispatch(groupUpdate({groupId: findGroups.id, name: nameGroup,specializationId: specializationId}))
            }

            setOpen(false);
        };


        const handleClose = () => {
            setOpen(false)
        }

        return (
            <>
                <div className={`modalForm__overlay ${open ? 'show' : ''} `}>
                    <div className="modalForm__content">
                        <form className="modalForm__form" onSubmit={selectedItem ? submitEdit : submitCreate}>
                            <div className="modalForm__close">
                                <button type="button" onClick={handleClose}>
                                    <Image src={close} alt="close"/>
                                </button>
                            </div>

                            <h2 className="modalForm__title">{selectedItem ? 'Редактировать группу' : 'Создать группу'}</h2>

                            <div className="modalForm__form__content">
                                <div className="modalForm-block">
                                    <input
                                        required
                                        value={nameGroup}
                                        onChange={e => setNameGroup(e.target.value)}
                                        className="modalForm__input"
                                        type="text"
                                    />
                                    <label className='modalForm__label'>Введите имя группы</label>
                                </div>

                                <div className="modalForm-block">
                                    <select className='modalForm__select'
                                            onChange={e => setSpecializationId(e.target.value)}
                                            value={specializationId}
                                            required={true}>
                                        <option>Выберите специализацию</option>
                                        {specializations && specializations.map(item => (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))}

                                    </select>
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

export default GroupModalCreate;