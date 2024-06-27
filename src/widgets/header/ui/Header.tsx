'use client';
import React, {useState} from 'react';
import './styles.scss'
import logo from '@/shared/image/logo/logo.svg';
// import userNotAuth from '@/shared/image/user/user-notAuth.svg';
// import {Navigate, useLocation, useNavigate} from "react-router-dom";
// import {DropMenuUser} from "@/widgets/drop-user";
// import {NavDrop} from "@/features/navDrop";
import {Modal} from "@/widgets/modalWindow";
// import {DropMenuUser} from "@/widgets/drop-user";
import Link from "next/link";
import Image from "next/image";
import {DropMenuUser} from "@/widgets/drop-user";
// import {ContextAuth} from "@/app/hoc/Context";
// import {DropMenuUser} from "@/widgets/drop-user";


const Header = () => {
    const [open, setOpen] = useState(false);

    // const pathname = usePathname();
    // let hidden = false
    //
    // if(pathname !== '/') {
    //     hidden = true;
    // }

    // правки --------------------------
    // const handleOpen = () => {
    //     if (setOpen) {
    //         setOpen(true);
    //     }
    // }
    // правки -------------------------

    // useEffect(() => {
    //     // console.log(open)
    // }, [open]);
    //
    // const router = useRouter()
    // const clear = () => {
    //     localStorage.removeItem('token')
    //     router.push('/')
    // }

    return (
        // hidden &&
        <>
            <header className="header">
                <div className="container">
                    <div className="header__row">

                        <Link href={'/'} className="header__logo">
                            <Image src={logo} alt="logo"/>
                        </Link>

                        {/*<button onClick={clear}>Logout</button>*/}

                        <div className="nav-block">
                            {/*<NavDrop/>*/}

                            <ul className="nav__list">
                                <li className="nav__item"><Link href="">Выпускники</Link></li>
                                <li className="nav__item"><Link href="/control">Управление</Link></li>
                                <li className="nav__item"><Link href="">Студенческие работы</Link></li>
                            </ul>

                            {/*<div className="header__entry">*/}
                            {/*    <p className='header__text-user'>Войти</p>*/}

                            {/*/!*<button className='header__user' onClick={handleOpen}>*!/*/}
                            {/*    /!*<img src={userNotAuth} alt="user"/>*!/*/}
                            {/*    <div className='header__text-user'>Войти</div>*/}
                            {/*    /!*Войти*!/*/}
                            {/*/!*</button>*!/*/}

                            {/*кнопка надо reducer*/}
                            {/*<AuthButton setOpen={setOpen}/>*/}
                        </div>

                        <DropMenuUser/>
                    </div>
                </div>

                {/*</div>*/}
            </header>
            <Modal open={open} setOpen={setOpen}/>
        </>
    );
};

export default Header;