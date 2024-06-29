import React, {Dispatch, useEffect, useState} from 'react';
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';

import './styles.scss'
import '@/widgets/styles/modal.scss'

import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
import {Posts} from "@/app/types";
import {Bounce, toast, ToastContainer} from "react-toastify";
import {setTableDataCreate, updateTableData} from "@/features/employees/slice/employees";
import {employeesCreate, employeesReplace} from "@/features/employees/action/action";

import close from "@/shared/image/modal/close.svg";

interface WorkerCreateModalProps {
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedItem?: any;
    open: boolean;
}

const WorkerCreateModal: React.FC<WorkerCreateModalProps> =
    ({
         setOpen,
         selectedItem,
        open
     }) => {
        const [firstName, setFirstName] = useState<string>(selectedItem && selectedItem.firstName || '');
        const [lastName, setLastName] = useState<string>(selectedItem && selectedItem.lastName || '')
        const [middleName, setMiddleName] = useState<string>(selectedItem && selectedItem.middleName || '')
        const [posts, setPosts] = useState<Posts[]>([])

        const tableData = useAppSelector((state: RootState) => state.employees.tableData)


        useEffect(() => {
            if (selectedItem) {
                setFirstName(selectedItem.firstName)
                setLastName(selectedItem.lastName)
                setMiddleName(selectedItem.middleName)
            } else {
                setFirstName('')
                setLastName('')
                setMiddleName('')
            }
        }, [selectedItem]);

        const dispatch = useAppDispatch();

        useEffect(() => {
            if (selectedItem && selectedItem.posts) {
                setPosts(selectedItem?.posts)
            }
        }, [selectedItem]);

        const submitCreate = (e: React.FormEvent) => {
            e.preventDefault();

            if (posts.length === 0) {
                toast.error('Необходима добавить должность!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });

                return
            }

            let array:number[] = []

            posts.map(item => {
                array.push(item.id);
            })

            dispatch(setTableDataCreate({firstName: firstName,lastName: lastName,middleName: middleName,blocked: false,posts: posts}));
            dispatch(employeesCreate({firstName: firstName,lastName: lastName,middleName: middleName, roles: array}))

            setPosts([])
            setOpen(false);
        }

        const submitEdit = (e: React.FormEvent) => {
            e.preventDefault();

            if (!tableData || !selectedItem) return

            if (posts.length === 0) {
                toast.error('Необходима добавить должность!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                return;
            }

            const findUpdateWorker = tableData.find(item => item.id === selectedItem.id)

            if(findUpdateWorker) {
                dispatch(updateTableData({
                    id: findUpdateWorker.id,
                    firstName: firstName,
                    lastName: lastName,
                    middleName: middleName,
                    posts: posts,
                }));

                dispatch(employeesReplace({id: findUpdateWorker.id, firstName, lastName: lastName, middleName: middleName}))
            }

            setOpen(false);
        };

        const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedValue: number = parseInt(e.target.value, 10);

            let name;

            switch (selectedValue) {
                case 0:
                    name = "Студент"
                    break
                case 1:
                    name = "Преподаватель"
                    break
                case 2:
                    name = "Заведующий отделением"
                    break
                case 3:
                    name = "Классный руководитель"
                    break
                case 4:
                    name = "Представитель компании"
                    break
                default:
                    return
            }

            const selectObj = {id: selectedValue, name: name}

            const allExists = posts.some(item => item.id === selectObj.id)

            if (!allExists) {
                setPosts(prevState => [...prevState, {id: selectedValue, name: name}])
            }
        }

        const handleClose = () => {
            setOpen(false)
        }

        const deleteRole = (id: number) => {
            setPosts(posts.filter(item => item.id !== id))
        }

        return (
            <>
                <div className={`assent__modal__overlay ${open ? 'show' : ''}`}>
                    <div className="modalForm__content">

                        <ToastContainer/>
                        <form className="modalForm__form" onSubmit={selectedItem ? submitEdit : submitCreate}>
                            <div className="modalForm__close">
                                <button type="button" onClick={handleClose}>
                                    <Image src={close} alt="close"/>
                                </button>
                            </div>

                            <h2 className="modalForm__title">{selectedItem ? 'Редактировать сотрудника' : 'Добавить сотрудника'}</h2>

                            <div className="modalForm__form__content">
                                <div className="modalForm-block">
                                    <input
                                        required
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        className="modalForm__input"
                                        type="text"
                                    />
                                    <label className="modalForm__label">Введите имя</label>
                                </div>

                                <div className="modalForm-block">
                                <input
                                        required
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        className="modalForm__input"
                                        type="text"
                                    />
                                    <label className="modalForm__label">Введите фамилию</label>
                                </div>

                                <div className="modalForm-block">
                                <input
                                        required
                                        value={middleName}
                                        onChange={e => setMiddleName(e.target.value)}
                                        className="modalForm__input"
                                        type="text"
                                    />
                                    <label className="modalForm__label">Введите отчество</label>
                                </div>

                                {!selectedItem &&

                                <div className="modalForm-block">
                                    <div className='modalForm__selected'>
                                        {posts.map(item => (
                                            <span className="modalForm__selected-item" key={item.id}
                                                  onClick={() => deleteRole(item.id)}>
                                        {item.name}
                                                <Image style={{cursor: "pointer"}} src={close} width={8} alt="close"/>
                                    </span>
                                        ))}
                                    </div>

                                    <select className='modalForm__select' onChange={changeSelect} value={-1}
                                            required={true}>
                                        <option
                                            value="-1">{posts.length === 0 ? 'Выберите роль' : `Выбрана ${posts.length} роль`}</option>
                                        <option value="0">Студент</option>
                                        <option value="1">Преподаватель</option>
                                        <option value="2">Заведующий отделением</option>
                                        <option value="3">Классный руководитель</option>
                                        <option value="4">Представитель компании</option>
                                    </select>
                                </div> }
                            </div>

                            <div className="modalForm-block-button" style={{marginTop: '170px'}}>
                                <ButtonAuth title="Сохранить" width={128} height={52} hover={true}/>
                            </div>

                        </form>
                    </div>
                </div>
            </>
        );
    };

export default WorkerCreateModal;