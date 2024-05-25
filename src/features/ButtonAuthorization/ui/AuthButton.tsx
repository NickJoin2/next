'use client';
import React, {Dispatch} from 'react';
import '../styles/styles.scss'

const AuthButton = ({setOpen}: {  setOpen?: Dispatch<React.SetStateAction<boolean>> }) => {

    const handleOpen = () => {
        if (setOpen) {
            setOpen(true);
        }
    }
    
    return <button className="auth__button" onClick={handleOpen}>Войти</button>
};

export default AuthButton;