import React, {Dispatch} from 'react';
import Image from "next/image";
import '../styles/styles.scss'

interface ImgProps {
    src: string;
    width: number;
    height: number;
}

interface SendProps {
    title: string;
    img: ImgProps;
}

const ButtonSend: React.FC<SendProps> = ({title, img}) => {
    return (
        <>
            <div className='send'>
                <button className='send__button'>
                    <span className='send__title'>{title}</span>
                    <Image width={img.width} height={img.height} src={img.src} alt="img"/>
                </button>
            </div>
        </>
    )
};

export default ButtonSend;