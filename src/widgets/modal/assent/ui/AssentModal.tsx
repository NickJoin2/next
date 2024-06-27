import React from 'react';
import Image from "next/image";

import '../styles/styles.scss'

import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

import {useAppDispatch} from "@/app/store/appStore";
import {setAssentModal} from "@/features/other/slice/other";

import close from "@/shared/image/modal/close.svg";


const AssentModal = ({
                         title,
                         submitGreen,
                         submitRed
                     }: {
    title: string,
    submitGreen: (e: React.FormEvent) => void,
    submitRed: (e: React.FormEvent) => void
}) => {

    const dispatch = useAppDispatch();
    const handleClose = () =>  dispatch(setAssentModal(false))

    return (
        <div className="modal__overlay">
            <div className="modal__content">
                <div className="modal__form">
                    <div className="modal__close">
                        <button type="button" onClick={handleClose}>
                            <Image src={close} alt="close" />
                        </button>
                    </div>

                    <h2 className="modal__title">{title}</h2>

                    <div className="modal-blocks">
                        <form onSubmit={submitRed}>
                            <ButtonAuth background="#CB0000" title="Отмена" width={200} height={80} anim={true} />
                        </form>

                        <form onSubmit={submitGreen}>
                            <ButtonAuth background="#0aef43" title="Подтвердить" width={200} height={80} anim={true} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssentModal