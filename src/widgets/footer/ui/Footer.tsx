'use client';
import React from 'react';
import '../styles/styles.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__row">
                    <div className="footer__block">&copy; Умный колледж. Все права защищены.</div>
                    <div className="footer__block">г. Ульяновск, проспект Созидателей, д. 13</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;