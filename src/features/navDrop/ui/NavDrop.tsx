'use client';
import React, {useEffect, useRef, useState} from 'react';
import polygon from "@/shared/image/ui-element/polygon.svg";
import activePolygon from "@/shared/image/ui-element/poligoneActive.svg"
import "../styles/styles.scss";
import {useClickOutside} from "@/app/hooks/useClickOutside";
import Link from "next/link";
import Image from "next/image";

const NavDrop = () => {

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    useClickOutside(menuRef, () => {
        if (isOpen) setIsOpen(false)
    });

    useEffect(() => {
        // console.log(isOpen)
    }, [isOpen]);

    return (
        <nav className="nav">
            <button onClick={() => setIsOpen(!isOpen)}>
                Студенческие работы

                {isOpen ? <Image src={activePolygon} alt="polygon"/>
                    : <Image src={polygon} alt="polygon"/>}
            </button>
            <div className={`nav__content ${isOpen ? 'active' : ''}`}>
                <ul className='nav__list' ref={menuRef}>
                    <li className="nav__item">
                        <Link href={'/diplom'}>Дипломные работы</Link>
                    </li>
                    <li className="nav__item">
                        <Link href={'/cursach'}>Курсовые работы</Link>
                    </li>
                </ul>
            </div>

        </nav>
    );
};

export default NavDrop;