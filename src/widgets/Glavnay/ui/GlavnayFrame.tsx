'use client';
import React from 'react';
import ButtonAuth from "@/features/buttonAuth/ui/ButtonAuth";
import '../styles/styles.scss'

const GlavnayFrame = ({text, img}:{text:string, img?: string}) => {

    return (
        <div className="glavnay" style={{backgroundImage: `url(${img})`}}>
            <div className="container">

                <div className="glavnay__block">
                    <h1>{text}
                        <br/>
                        <span>здесь</span>
                    </h1>
                    <ButtonAuth/>
                </div>

            </div>
        </div>
    );
};

export default GlavnayFrame;