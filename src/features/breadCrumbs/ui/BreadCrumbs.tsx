// import React, {useEffect, useState} from 'react';
// import {usePathname} from "next/navigation";
// import Link from 'next/link';
// import Image from "next/image";
//
// import './styles.scss'
//
// import breadCrumbsImage from '@/shared/image/breadCrumbs/BreadCrumbs.svg';
// import breadCrumbsArrowImage from '@/shared/image/breadCrumbs/BreadCrumbsArrow.svg';
//
// interface Bread {
//     href: string;
//     label: string;
// }
//
// const BreadCrumbs = () => {
//     const pathname = usePathname();
//     const [breadcrumbs, setBreadcrumbs] = useState<Bread[]>([]);
//
//     useEffect(() => {
//         if (pathname) {
//             const pathArray = pathname.split('/').filter(x => x);
//             const breadcrumbArray = pathArray.map((path, idx) => {
//                 const href = '/' + pathArray.slice(0, idx + 1).join('/');
//                 return {href, label: path};
//             });
//             setBreadcrumbs(breadcrumbArray);
//         }
//
//     }, [pathname]);
//
//
//
//     return (
//         <nav className="breadcrumb">
//             <ul className="breadcrumb__list">
//                 <li className='breadcrumb__item'>
//                     <Link href="/">
//                         <Image className='breadcrumb__logo' src={breadCrumbsImage} alt="Breadcrumbs"/>
//                     </Link>
//                 </li>
//                 {breadcrumbs.map((crumb, index) => (
//
//                     <li className='breadcrumb__item' key={index}>
//                         <span><Image src={breadCrumbsArrowImage} alt="arrow"/></span>
//                         {index == breadcrumbs.length - 1 ? (
//                             <span className=''>{crumb.label}</span>
//                         ) :
//                             <Link className='breadcrumb__text text' href={crumb.href}>{crumb.label}</Link>
//                         }
//                     </li>
//                 ))}
//             </ul>
//         </nav>
//     );
// };
// export default BreadCrumbs;

'use client'

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import './styles.scss';

import breadCrumbsImage from '@/shared/image/breadCrumbs/BreadCrumbs.svg';
import breadCrumbsArrowImage from '@/shared/image/breadCrumbs/BreadCrumbsArrow.svg';

interface Bread {
    href: string;
    label: string;
}

interface BreadCrumbsProps {
    breadCrumb: { [key: string]: string };
}

const BreadCrumbs = ({ breadCrumb }: BreadCrumbsProps) => {
    const pathname = usePathname();
    const [breadcrumbs, setBreadcrumbs] = useState<Bread[]>([]);

    useEffect(() => {
        if (pathname) {
            const pathArray = pathname.split('/').filter(x => x);
            const breadcrumbArray = pathArray.map((path, idx) => {
                const href = '/' + pathArray.slice(0, idx + 1).join('/');
                const label = breadCrumb[href] || path; // Используем метаданные для получения названия
                return { href, label };
            });
            setBreadcrumbs(breadcrumbArray);
        }
    }, [pathname,breadCrumb]);

    return (
        <nav className="breadcrumb">
            <ul className="breadcrumb__list">
                <li className='breadcrumb__item'>
                    <Link href="/">
                        <Image className='breadcrumb__logo' src={breadCrumbsImage} alt="Breadcrumbs" />
                    </Link>
                </li>
                {breadcrumbs.map((crumb, index) => (
                    <li className='breadcrumb__item' key={index}>
                        <span><Image src={breadCrumbsArrowImage} alt="arrow" /></span>
                        {index === breadcrumbs.length - 1 ? (
                            <span className='breadcrumb__text'>{crumb.label}</span>
                        ) : (
                            <Link className='breadcrumb__text text' href={crumb.href}>{crumb.label}</Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default BreadCrumbs;
