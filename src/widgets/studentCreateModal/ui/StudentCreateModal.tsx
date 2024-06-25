import React, {Dispatch, useState} from 'react';
import Image from "next/image";
import '@/widgets/control/modal/workerCreate/ui/WorkerCreateModal'
import 'react-toastify/dist/ReactToastify.css';
import close from "@/shared/image/modal/close.svg";
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {EmployeeDTO} from "@/features/types";
import {studentReplace} from "@/features/student/actions/students";
import {updateTableStudent} from "@/features/students/slice/students";

interface WorkerCreateModalProps {
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedItem?: any;
}

const StudentCreateModal: React.FC<WorkerCreateModalProps> =
    ({
         setOpen,
         selectedItem,
     }) => {
        const [firstName, setFirstName] = useState<string>(selectedItem && selectedItem.firstName || '');
        const [lastName, setLastName] = useState<string>(selectedItem && selectedItem.middleName || '')
        const [middleName, setMiddleName] = useState<string>(selectedItem && selectedItem.middleName || '')
        const [blockd, setBlockd] = useState<string>(selectedItem && selectedItem.blocked ? '1' : '0')
        const [blocked, setBlocked] = useState<boolean>(selectedItem && selectedItem.blocked)


        const tableData = useAppSelector((state: RootState) => state.student.tableDataStudent)

        const dispatch = useAppDispatch();

        const submitEdit = (e: React.FormEvent) => {
            e.preventDefault();

            if (!tableData || !selectedItem) {
                return;
            }

            tableData.map((item:EmployeeDTO) => {
                if (item.id === selectedItem.id) {

                    const newEntry = {
                        id: item.id,
                        firstName: firstName,
                        lastName: lastName,
                        middleName: middleName,
                        blocked: blocked
                    }

                    dispatch(updateTableStudent(newEntry));
                    const studentId = item.id
                    dispatch(studentReplace({studentId, firstName, lastName, middleName, blocked}))
                }

                return item;
            });

            setOpen(false);
        };

        const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedValue: number = parseInt(e.target.value, 10);
            switch (selectedValue) {
                case 0:
                    setBlocked(false)
                    break
                case 1:
                    setBlocked(true)
                    break
                default:
                    return
            }
        }

        const handleClose = () => {
            setOpen(false)
        }

        return (
            <>
                <div className="modal__overlay">
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
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        className="modal__input"
                                        type="text"
                                        placeholder="Введите имя"
                                    />
                                </div>

                                <div className="modal-block">
                                    <input
                                        required
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        className="modal__input"
                                        type="text"
                                        placeholder="Введите фамилию"
                                    />
                                </div>

                                <div className="modal-block">
                                    <input
                                        required
                                        value={middleName}
                                        onChange={e => setMiddleName(e.target.value)}
                                        className="modal__input"
                                        type="text"
                                        placeholder="Введите отчество"
                                    />
                                </div>

                                <div className="modal-block">

                                    <select className='modal__select' onChange={changeSelect} value={blockd}
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
                </div>
            </>
        );
    };

export default StudentCreateModal;