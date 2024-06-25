// import React, {Dispatch, useState} from 'react';
// import close from '@/shared/image/modal/close.svg'; // Подразумевается, что путь к изображению верный
// import '../styles/styles.scss';
// import emailImg from '@/shared/image/modal/email.svg'
// import eye from '@/shared/image/modal/eye.password.svg'
// // import {AuthButton} from "@/features/ButtonAuthorization";
// // import {RootState, useAppDispatch, useAppSelector} from "@/app/store/appStore";
// // import {fetchRegister} from "@/features/userAuthorization/slice/registerSlice";
// import Image from "next/image";
// import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
// import {fetchRegister} from "@/features/userAuthorization/slice/registerSlice";
// import {useAppDispatch} from "@/app/store/appStore";
//
//
//
// // import {groupUpdate} from "@/features/group/slice/group";
// // import {StudentSave} from "@/features/student/getStudent/slice/slice";
// // import {patchStudent, studentPatch} from "@/features/student/patchStudent/slice/slice";
//
//
// const Modal = ({open, setOpen}: { open: boolean, setOpen: Dispatch<React.SetStateAction<boolean>> }) => {
//
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//
//     const dispatch = useAppDispatch();
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         dispatch(fetchRegister({ email, password }));
//         // console.log({email, password})
//     };
//
//     // // const token = useAppSelector((state:RootState) => state.register.token)
//     // // const status = useAppSelector((state:RootState) => state.register.status)
//     // // const error = useAppSelector((state:RootState) => state.register.error)
//
//     // // useEffect(() => {
//     // //     console.log('token ' + token)
//     // //     console.log('status ' + status)
//     // //     console.log(error)
//     // // }, [token, status, error]);
//
//
//     // -------------------------------------------------------------------------
//
//     // const [email, setEmail] = useState('');
//     // const [password, setPassword] = useState('');
//
//
//     // const dispatch = useAppDispatch();
//     //
//     // const handleSubmit = (e: React.FormEvent) => {
//     //     e.preventDefault();
//     //     console.log({email, password});
//     //     dispatch(fetchRegister({email, password}));
//     // };
//
//     // const data = useAppSelector((state:RootState) => state.group.data)
//
//     // -------------------------------------------------------------------------
//
//     // const status = useAppSelector((state:RootState) => state.updateStudent.state)
//     // const error = useAppSelector((state:RootState) => state.updateStudent.error)
//     // const data = useAppSelector((state:RootState) => state.updateStudent.data)
//
//     // useEffect(() => {
//     //     console.log(data)
//     // }, [data]);
//
//
//     const handleClose = () => {
//         setOpen(false);
//     }
//
//     const [visible, setVisible] = useState(false);
//     const handleVisibility = () => {
//         setVisible(!visible)
//     };
//
//     return (
//         open && (
//             <div className="modal__overlay">
//                 <div className="container">
//                     <div className="modal__content">
//
//                         <form className="modal__form" onSubmit={handleSubmit}>
//                         {/*<form className="modal__form">*/}
//                             <div className="modal__close">
//                                 <button onClick={handleClose}>
//                                     <Image src={close} alt="close"/>
//                                 </button>
//                             </div>
//
//                             <h2 className="modal__title">Авторизация</h2>
//
//                             <div className="modal__form__content">
//                                 <div className="modal-block">
//                                     <label className="modal__label" htmlFor="email">Введите почту</label>
//
//                                     <div className="modal-block">
//                                         <input className="modal__input"
//                                                onChange={e => setEmail(e.target.value)}
//                                                type="text" id="email" placeholder="Email"/>
//                                         <Image className='modal__input-img' src={emailImg} alt="emails"/>
//                                     </div>
//
//                                 </div>
//                                 {/*{error?.email && <p>{error.email}</p>}*/}
//
//                                 <div className="modal-block">
//                                     <label
//                                         className="modal__label"
//                                         htmlFor="password"
//                                     >Введите пароль</label>
//                                     <div className="modal-block">
//                                         <input className="modal__input"
//                                                onChange={e => setPassword(e.target.value)}
//                                                type={visible ? 'text' : 'password'} id="password" placeholder="Пароль"/>
//                                         <button
//                                             className='modal__input-img'
//                                             onClick={handleVisibility}>
//                                             <Image src={eye} alt="eye"/>
//                                             {visible && <div className="modal__input-img-eyeClose"></div>}
//                                         </button>
//                                     </div>
//
//                                 </div>
//                                 {/*{error?.password && <p>{error.password}</p>}*/}
//                             </div>
//
//                             <div className="modal-block-button">
//                                 {/*<button className="modal__form-button">Войти</button>*/}
//                                 {/*<AuthButton/>*/}
//                                 <ButtonAuth title={'Войти'} width={128} height={52}/>
//                             </div>
//                         </form>
//
//                     </div>
//                 </div>
//             </div>
//         )
//     );
// };
//
// export default Modal;
// appStore.ts
// 'use client'
// import { configureStore } from "@reduxjs/toolkit";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import rootReducer from "./rootReducer";
//
// export const store = configureStore({
//     reducer: rootReducer
// });
//
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// // rootReducer.ts
// import { combineReducers } from "@reduxjs/toolkit";
// import registerReducer from "@/features/userAuthorization/slice/registerSlice";
// import specializationsReducer from "@/features/specializations/slice/specialization";
// import employeesReducer from "@/features/employees/slice/employees";
// import disciplinesReducer from "@/features/disciplines/slice/disciplines";
// import stagesReducer from "@/features/stages/slice/stages";
// import stagesAnswerReducer from "@/features/stagesAnswer/slice/stagesAnswer";
// import projectsStagesGradesReducer from "@/features/projectStagesGrade/slice/projectStagesGrades";
// import studentReducer from "@/features/students/slice/students";
// import groupReducer from "@/features/group/slice/group";
//
// const rootReducer = combineReducers({
//     register: registerReducer,
//     student: studentReducer,
//     group: groupReducer,
//     specialization: specializationsReducer,
//     employees: employeesReducer,
//     disciplines: disciplinesReducer,
//     stages: stagesReducer,
//     stagesAnswer: stagesAnswerReducer,
//     projectStagesGrades: projectsStagesGradesReducer
// });
//
// export default rootReducer;


'use client'
import React, { Dispatch, SetStateAction, useState } from 'react';
import close from '@/shared/image/modal/close.svg';
import '../styles/styles.scss';
import emailImg from '@/shared/image/modal/email.svg';
import eye from '@/shared/image/modal/eye.password.svg';
import Image from "next/image";
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import {useAppDispatch} from "@/app/store/appStore";
import {fetchRegister} from "@/features/userAuthorization/slice/registerSlice";
// import { fetchRegister } from "@/features/userAuthorization/slice/registerSlice";
// import { useAppDispatch } from "@/app/store/appStore";

const Modal = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleVisibility = () => {
        setVisible(!visible);
    };

    const dispatch = useAppDispatch();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(fetchRegister({ email, password }));
    };

    return (
        open && (
            <div className="modal__overlay">
                <div className="container">
                    <div className="modal__content">
                        <form className="modal__form" onSubmit={handleSubmit}>
                        {/*<form className="modal__form">*/}
                            <div className="modal__close">
                                <button type="button" onClick={handleClose}>
                                    <Image src={close} alt="close" />
                                </button>
                            </div>

                            <h2 className="modal__title">Авторизация</h2>

                            <div className="modal__form__content">
                                <div className="modal-block">
                                    <label className="modal__label" htmlFor="email">Введите почту</label>
                                    <div className="modal-block">
                                        <input
                                            className="modal__input"
                                            onChange={e => setEmail(e.target.value)}
                                            type="text"
                                            id="email"
                                            placeholder="Email"
                                        />
                                        <Image className="modal__input-img" src={emailImg} alt="emails" />
                                    </div>
                                </div>

                                <div className="modal-block">
                                    <label className="modal__label" htmlFor="password">Введите пароль</label>
                                    <div className="modal-block">
                                        <input
                                            className="modal__input"
                                            onChange={e => setPassword(e.target.value)}
                                            type={visible ? 'text' : 'password'}
                                            id="password"
                                            placeholder="Пароль"
                                        />
                                        <button
                                            type="button"
                                            className="modal__input-img"
                                            onClick={handleVisibility}
                                        >
                                            <Image src={eye} alt="eye" />
                                            {visible && <div className="modal__input-img-eyeClose"></div>}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-block-button">
                                <ButtonAuth title="Войти" width={128} height={52} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default Modal;