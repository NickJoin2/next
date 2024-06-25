import React, {Dispatch, useContext} from 'react';
import close from '@/shared/image/modal/close.svg'
import Image from 'next/image'
import './styles.scss'
import {ContextAuth} from "@/app/hoc/Context";
import Link from "next/link";

const ModalCursachDiplom = ({setOpen}: {setOpen: Dispatch<React.SetStateAction<boolean>>}) => {

    const handleClose = () => {
        setOpen(false)
    }

    const context = useContext(ContextAuth)
   const role = context?.role


    return (
        <div className="container">
            <div className="modalCD__overlay">
                <div className="modalCD__content">
                    <div className="modalCD__close">
                        <button type="button" onClick={handleClose}>
                         <Image src={close} alt="close"/>
                        </button>
                    </div>
                    <div className="modalCD__form">
                        <div
                            className="modalCD__form-item"><Link href={'/diplom'}>Дипломные работы</Link>
                        </div>
                        <div
                            className="modalCD__form-item"><Link href={'/cursovic'}>Курсовые работы</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCursachDiplom;