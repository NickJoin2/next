'use client'
import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface Props {
    isAuth: boolean;
    role: string | null;
}

interface JwtPayload {
    sub: string;
    name: string;
    role: string;
}

export const ContextAuth = createContext<Props | null>(null);

const Context = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [role, setRole] = useState<string | null>('');

    useEffect(() => {
        const token: string|null = localStorage.getItem('token');

        if (!token) {
            setIsAuth(false);
            setRole(null);
            return
        }

        const tokenVerify: JwtPayload = jwtDecode(token);
        const decodeRole = tokenVerify.role;

       if(decodeRole) {
           setIsAuth(true);
           setRole(decodeRole);
       }

    }, []);

    const values: Props = { isAuth, role };

    return (
        <ContextAuth.Provider value={values}>{children}</ContextAuth.Provider>
    );
};

export default Context;