import React from 'react';
import './styles.scss'

import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";

const AssentModal = ({
                         title,
                         submitGreen,
                         submitRed,
                        open
                     }: {
    title: string,
    submitGreen: (e: React.FormEvent) => void,
    submitRed: (e: React.FormEvent) => void,
    open: boolean
}) => {


    return (
        <div className={`assent__modal__overlay ${open ? 'show' : ''}`}>
            <div className="assent__modal__content">
                <div className="assent__modal__form">


                    <h2 className="assent__modal__title">{title}</h2>

                    <div className="assent__modal-blocks">
                        <form onSubmit={submitRed}>
                            <ButtonAuth background="#CB0000" title="Отмена" width={200} height={80} anim={true}/>
                        </form>

                        <form onSubmit={submitGreen}>
                            <ButtonAuth background="#0aef43" title="Подтвердить" width={200} height={80} anim={true}/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssentModal