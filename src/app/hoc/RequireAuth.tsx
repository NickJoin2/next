import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface Auth {
    sub: string;
    name: string;
    role: string[];
}

const RequireAuth: React.FC<{ rolesToCheck?: string[], children: React.ReactNode }> = ({ rolesToCheck = [], children }) => {
    const router = useRouter();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const checkAuth = () => {
            if (!token) {
                router.push('/');
                return;
            }
            const auth: Auth | null = jwtDecode(token);
            console.log(auth)
            if (!rolesToCheck.some((role) => auth?.role.includes(role))) {
                console.log('Права доступа отсутствуют');
                router.push('/');
            }
        };

        checkAuth();
    }, [token]);

    return <>{children}</>;
};

export default RequireAuth;