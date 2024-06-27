import React, {useRef, useState} from 'react';
import Image from 'next/image'
import Link from "next/link";

import './styles.scss'

import {RootState, useAppSelector} from "@/app/store/appStore";
import {useDispatch} from "react-redux";
import {useClickOutside} from "@/app/hooks/useClickOutside";
import {logout} from "@/features/userAuthorization/slice/registerSlice";
import {useRouter} from "next/navigation";

import userIcon from "@/shared/image/user/user-icon.svg";

const DropMenuUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const redirect = useAppSelector((state:RootState) => state.register.redirect)

    const dispatch = useDispatch();
    const router = useRouter()

    useClickOutside(menuRef, () => {
        if (isOpen) setIsOpen(false)
    });

    const handleLogout = async() => {
       dispatch(logout())
    }

    if(redirect) {
        const redirectUrl = () => {
            router.push('/')
        }
      redirectUrl()
    }

    return (
        <div className="user">
            <button onClick={() => setIsOpen(!isOpen)}>
                <p>Оксана Черниюк</p>
                <Image className="user__image" src={userIcon} alt="user"/>
            </button>


            <div className={`user__content ${isOpen ? 'active' : ''}`}>
                <ul className="user__list" ref={menuRef}>
                    <li className="user__item">
                        <Link href={'/office'}>Личные кабинет</Link>
                    </li>
                    <li className="user__item">
                        <Link href={'/'} style={{fontSize: '20px'}}>Выпускники</Link>
                    </li>
                    <li className="user__item">
                        <Link href={'/control'}>Управление</Link>
                    </li>
                    <li className="user__item">
                        <Link href={''} style={{fontSize: '15px'}}>Студенческие работы</Link>
                    </li>
                    <li className="user__item">
                        <Link href={''} onClick={handleLogout}>Выйти</Link>
                    </li>
                </ul>
            </div>

        </div>
    );
};

export default DropMenuUser;