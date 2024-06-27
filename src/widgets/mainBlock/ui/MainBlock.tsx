'use client';
import React, {Dispatch} from 'react';
import Link from "next/link";

import '../styles/styles.scss'

import styled, {css} from "styled-components";

interface ImageObject {
    src?: string;
}

interface MainBlockProps {
    img?: ImageObject;
    gridColumn?: string;
    gridRow?: string;
    text?: string;
    mapLink: string;
    setOpen?: Dispatch<React.SetStateAction<boolean>>
}

const MainBlock = ({img, gridColumn, gridRow, text, mapLink, setOpen}: MainBlockProps) => {

    const MapItem = styled.div`
        cursor: pointer;
        border-radius: 10px;
        background: linear-gradient(133deg, #456b92 0%, #9bc7e0 51.6%, #456b92 100%);
        grid-column: ${gridColumn};
        grid-row: ${gridRow};
        transition: .6s ease;
        
        
        ${img? css`
            &:hover {
                background-image: url(${img.src});
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
            }` : ''}`;

    const openModal = () => {
        if(setOpen) {
            setOpen(true)
        }
    }

    return (
        <MapItem className="map-item item5" onClick={openModal}><Link href={mapLink}><p className="map__title">{text}</p></Link></MapItem>
    );
};

export default MainBlock;