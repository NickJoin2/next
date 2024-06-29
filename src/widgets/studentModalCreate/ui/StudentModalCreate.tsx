import React, {Dispatch, useEffect, useState} from 'react';
import Image from "next/image";

import '@/widgets/styles/modal.scss'

import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {StudentDTO} from "@/features/types";
import {studentReplace} from "@/features/student/actions/students";
import {updateTableStudentGroup} from "@/features/students/slice/students";

import close from "@/shared/image/modal/close.svg";

interface WorkerCreateModalProps {
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedItem?: any;
    groupId?: string;
    open: boolean;
}

const StudentModalCreate: React.FC<WorkerCreateModalProps> =
    ({
         setOpen,
         selectedItem,
         groupId,
        open,
     }) => {
        const [firstname, setFirstName] = useState<string>('');
        const [lastname, setLastName] = useState<string>('')
        const [middlename, setMiddleName] = useState<string>('')
        const [blocked, setBlocked] = useState<boolean>(false)


        useEffect(() => {
            if (selectedItem) {
                setFirstName(selectedItem.firstName);
                setLastName(selectedItem.lastName)
                setMiddleName(selectedItem.middleName)
                setBlocked(selectedItem.blocked)
            } else {
                setFirstName('');
                setLastName('')
                setMiddleName('')
                setBlocked(false)
            }
        }, [selectedItem]);

        const tableData = useAppSelector((state: RootState) => state.student.tableDataStudent)

        const dispatch = useAppDispatch();

        const submitEdit = (e: React.FormEvent) => {
            e.preventDefault();

            if (!tableData || !selectedItem) return

            const findStudentGroup = tableData.find((item: StudentDTO) => item.id === selectedItem.id)

            if (findStudentGroup) {
                if (groupId) {
                    dispatch(updateTableStudentGroup({
                        id: findStudentGroup.id,
                        firstName: firstname,
                        lastName: lastname,
                        middleName: middlename,
                        blocked: blocked
                    }));
                    dispatch(studentReplace({
                        groupId: groupId,
                        studentId: findStudentGroup.id,
                        firstname: firstname,
                        lastname: lastname,
                        middlename: middlename,
                        blocked: blocked
                    }))

                }
            }

            setOpen(false);
        };

        const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
            switch (e.target.value) {
                case '0':
                    setBlocked(false)
                    return
                case '1':
                    setBlocked(true)
                    return
                default:
                    return
            }
        }

        const handleClose = () => {
            setOpen(false)
        }

        return (
            <>
                <div className={`assent__modal__overlay ${open ? 'show' : ''}`}>
                    <div className="modalForm__content">
                        <form className="modalForm__form" onSubmit={submitEdit}>
                            <div className="modalForm__close">
                                <button type="button" onClick={handleClose}>
                                    <Image src={close} alt="close"/>
                                </button>
                            </div>

                            <h2 className="modalForm__title">Редактировать студента</h2>

                            <div className="modalForm__form__content">
                                <div className="modalForm-block">
                                    <input
                                        required
                                        value={firstname}
                                        onChange={e => setFirstName(e.target.value)}
                                        className="modalForm__input"
                                        type="text"
                                    />
                                    <label className="modalForm__label">Введите имя</label>
                                </div>

                                <div className="modalForm-block">
                                    <input
                                        required
                                        value={lastname}
                                        onChange={e => setLastName(e.target.value)}
                                        className="modalForm__input"
                                        type="text"
                                    />
                                    <label className="modalForm__label">Введите фамилию</label>
                                </div>

                                <div className="modalForm-block">
                                    <input
                                        required
                                        value={middlename}
                                        onChange={e => setMiddleName(e.target.value)}
                                        className="modalForm__input"
                                        type="text"
                                    />
                                    <label className="modalForm__label">Введите отчество</label>
                                </div>

                                <div className="modalForm-block">

                                <select className='modalForm__select' onChange={changeSelect}
                                            value={blocked === null ? '' : blocked ? '1' : '0'}
                                            required={true}>
                                        <option value="0">Заблокирован</option>
                                        <option value="1">Разблокирован</option>
                                    </select>
                                </div>
                            </div>

                            <div className="modalForm-block-button">
                                <ButtonAuth title="Сохранить" width={128} height={52} hover={true}/>
                            </div>

                        </form>
                    </div>
                </div>
            </>
        )
            ;
    };

export default StudentModalCreate;