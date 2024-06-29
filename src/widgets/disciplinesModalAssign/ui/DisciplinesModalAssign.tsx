import React, {useEffect, useState} from 'react';
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';

import '@/widgets/styles/modal.scss'


import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {EmployeeDTO} from "@/features/types";
import {employeesRead} from "@/features/employees/action/action";
import {disciplinesAssign} from "@/features/disciplines/action/action";
import {disciplinesModalAssign} from "@/features/disciplines/slice/disciplines";

import close from "@/shared/image/modal/close.svg";


interface WorkerCreateModalProps {
    selectedItem?: any;
    open: boolean;
}

const DisciplinesModalAssign: React.FC<WorkerCreateModalProps> =
    ({
         selectedItem,
        open
     }) => {
        const [array, setArray] = useState<EmployeeDTO[]>([]);
        const [arr, setArr] = useState<EmployeeDTO[]>([]);
        const [name, setName] = useState<string>(selectedItem && selectedItem.name || '');
        const [selectedValue, setSelectedValue] = useState<string>('')

        useEffect(() => {
            if (selectedItem) {
                setName(selectedItem.name);
            } else {
                setName('');
            }
        }, [selectedItem]);

        const data = useAppSelector((state: RootState) => state.employees.data)

        const dispatch = useAppDispatch();


        useEffect(() => {
            dispatch(employeesRead())
        }, [dispatch]);

        useEffect(() => {
            setArray(data)
        }, [data]);

        useEffect(() => {
            const filterTeacher = () => {
                const teachers = (array || []).filter(item =>
                    item.posts.some(post => post.id === 1)
                );

                teachers.forEach(newTeacher => {
                    const exists = arr.some(teacher => teacher.id === newTeacher.id);
                    if (!exists) {
                        setArr(prevArr => [...prevArr, newTeacher]);
                    }
                });
            };

            filterTeacher();
        }, [array,arr]);

        const submitCreate = (e: React.FormEvent) => {
            e.preventDefault();

            const newEntry: any = {
                disciplinesId: selectedItem && selectedItem.id,
                employeeId: selectedValue
            };

            dispatch(disciplinesAssign(newEntry));
            dispatch(disciplinesModalAssign(false));
        }

        const handleClose = () => {
            dispatch(disciplinesModalAssign(false));
        }


        return (
            <>
                <div className={`modalForm__overlay ${open ? 'show' : ''} `}>
                    <div className="modalForm__content">
                        <form className="modalForm__form"
                              onSubmit={submitCreate}>

                            <div className="modalForm__close">
                                <button type="button" onClick={handleClose}>
                                    <Image src={close} alt="close"/>
                                </button>
                            </div>

                            <h2 className="modalForm__title">Связать дисциплину с преподавателем</h2>

                            <div className="modalForm__form__content">
                                <div className="modalForm-block">
                                    <input required
                                           value={name}
                                           className="modalForm__input"
                                           type="text"
                                    />
                                    <label className="modalForm__label">Введите название дисциплины</label>
                                </div>


                                <div className="modalForm-block">
                                    <select className='modalForm__select' onChange={e => setSelectedValue(e.target.value)}
                                            required={true}>
                                        <option value="">Выберите преподавателя</option>
                                        {arr?.map(item => (
                                            <option value={item.id}
                                                    key={item.id}>{item.firstName} {item.middleName} {item.lastName}</option>
                                        ))}
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

export default DisciplinesModalAssign;