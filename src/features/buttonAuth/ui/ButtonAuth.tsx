'use client'
import React from 'react';
import './styles.scss'
import styled, {css} from "styled-components";
import Image from "next/image";
import {ButtonAuthProps} from "@/app/types";

const ButtonAuth = ({title, width, height, anim = false, setOpen, margin = '0 auto', hover = false, img, background = '#456B92'}: ButtonAuthProps) => {

    const Button = styled.button`
        display: block;
        margin: ${margin};
        font-weight: 400;
        font-size: 20px;
        line-height: 100%;
        text-align: center;
        color: #fff;
        border-radius: 10px;
        background: ${background};
        width: ${width}px;
        height: ${height}px;
        
        ${hover ? 
                css`
                    &:hover {
                        filter: brightness(110%);
                    }
                ` : ''}

        ${anim ?
                css`
                    @keyframes bounce {
                        0%, 20%, 60%, 100% {
                            transform: translateY(0);
                            transform: translateY(0);
                        }

                        40% {
                            transform: translateY(-20px);
                            transform: translateY(-20px);
                        }

                        80% {
                            transform: translateY(-10px);
                            transform: translateY(-10px);
                        }
                    }` : ''}

        ${anim ? css`
            &:hover {
                animation: bounce 1s;
            } ` : ''}`

    const handleOpen = () => {
        if(setOpen) {
            setOpen(true);
        }
    }

    return (
        <Button onClick={handleOpen}>{title} {img && <Image src={img} alt="send"/>} </Button>
    );
};

export default ButtonAuth;