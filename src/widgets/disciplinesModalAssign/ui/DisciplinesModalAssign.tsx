import React, {Dispatch, useEffect, useState} from 'react';

import '@/widgets/specializationsModalCreate/ui/styles.scss'
import 'react-toastify/dist/ReactToastify.css';
import close from "@/shared/image/modal/close.svg";
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import Image from "next/image";
import {employeesRead} from "@/features/employees/action/action";
import {EmployeeDTO} from "@/features/types";
import {disciplinesAssign} from "@/features/disciplines/action/action";



interface WorkerCreateModalProps {
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedItem?: any;
}

const DisciplinesModalAssign: React.FC<WorkerCreateModalProps> =
    ({
         setOpen,
         selectedItem,
     }) => {
        const data = useAppSelector((state: RootState) => state.employees.data)

        const [array, setArray] = useState<EmployeeDTO[]>([]);
        const [arr, setArr] = useState<EmployeeDTO[]>([]);
        const [name, setName] = useState<string>(selectedItem && selectedItem.name || '');
        const [selectedValue, setSelectedValue] = useState<string>('')



        const dispatch = useAppDispatch();

        useEffect(() => {
            dispatch(employeesRead())
        }, []);

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
                console.log(arr);
            };

            filterTeacher();
        }, [array]);



        const submitCreate = (e: React.FormEvent) => {
            e.preventDefault();

            const newEntry: any = {
                disciplinesId: selectedItem && selectedItem.id,
                employeeId: selectedValue
            };



            // const Entry = {
            //     name: name
            // }
            //
            // console.log(newEntry)
            //
            dispatch(disciplinesAssign(newEntry));
            setOpen(false);
        }



        const handleClose = () => {
            setOpen(false)
        }


        return (
            <>
                <div className="specialization__modal__overlay">
                    <div className="specialization__modal__content">

                        <form className="specialization__modal__form" onSubmit={submitCreate}>
                            <div className="specialization__modal__close">
                                <button type="button" onClick={handleClose}>
                                    <Image src={close} alt="close"/>
                                </button>
                            </div>

                            <h2 className="specialization__modal__title">Связать дисциплину с преподавателем</h2>

                            <div className="specialization__modal__form__content">

                                <div className="modal-block">
                                    <input
                                        required
                                        value={name}
                                        disabled={true}
                                        className="modal__input"
                                        type="text"
                                        placeholder="Введите имя"
                                    />
                                </div>

                                <div className="modal-block">

                                    <select className='modal__select' onChange={e => setSelectedValue(e.target.value)}
                                            required={true}>
                                        <option value="">Выберите преподавателя</option>
                                        {arr?.map(item => (
                                            <option value={item.id}
                                                    key={item.id}>{item.firstName} {item.middleName} {item.lastName}</option>
                                        ))}
                                    </select>
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

export default DisciplinesModalAssign;