import React, {Dispatch, useState} from 'react';
import Image from "next/image";

import '@/widgets/workerCreateModal/ui/WorkerCreateModal'
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
}

const StudentModalCreate: React.FC<WorkerCreateModalProps> =
    ({
         setOpen,
         selectedItem,
         groupId
     }) => {
        const [firstname, setFirstName] = useState<string>(selectedItem && selectedItem.firstName || '');
        const [lastname, setLastName] = useState<string>(selectedItem && selectedItem.middleName || '')
        const [middlename, setMiddleName] = useState<string>(selectedItem && selectedItem.middleName || '')
        const [blocked, setBlocked] = useState<boolean>(selectedItem && selectedItem.blocked)

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
                <div className="modal__content">
                    <form className="modal__form" onSubmit={submitEdit}>
                        <div className="modal__close">
                            <button type="button" onClick={handleClose}>
                                <Image src={close} alt="close"/>
                            </button>
                        </div>

                        <h2 className="modal__title">Редактировать студента</h2>

                        <div className="modal__form__content">
                            <div className="modal-block">
                                <input
                                    required
                                    value={firstname}
                                    onChange={e => setFirstName(e.target.value)}
                                    className="modal__input"
                                    type="text"
                                    placeholder="Введите имя"
                                />
                            </div>

                            <div className="modal-block">
                                <input
                                    required
                                    value={lastname}
                                    onChange={e => setLastName(e.target.value)}
                                    className="modal__input"
                                    type="text"
                                    placeholder="Введите фамилию"
                                />
                            </div>

                            <div className="modal-block">
                                <input
                                    required
                                    value={middlename}
                                    onChange={e => setMiddleName(e.target.value)}
                                    className="modal__input"
                                    type="text"
                                    placeholder="Введите отчество"
                                />
                            </div>

                            <div className="modal-block">

                                <select className='modal__select' onChange={changeSelect} value={blocked === null ? '' : blocked ? '1' : '0'}
                                        required={true}>
                                    <option value="0">Заблокирован</option>
                                    <option value="1">Разблокирован</option>
                                </select>
                            </div>
                        </div>

                        <div className="modal-block-button">
                            <ButtonAuth title="Сохранить" width={128} height={52} hover={true}/>
                        </div>

                    </form>
                </div>
            </>
        )
            ;
    };

export default StudentModalCreate;