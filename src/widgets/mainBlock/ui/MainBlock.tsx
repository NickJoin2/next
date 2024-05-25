'use client';
import React, { useState } from 'react';

import '../styles/styles.scss'
import Link from "next/link";
import Image, {StaticImageData} from "next/image";

const MainBlock = ({ img, title, icon }: { img?: StaticImageData, title: string, icon?: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseOver = () => {
      if(img)  setIsOpen(true);
    }

    const handleMouseOut = () => {
       if(img) setIsOpen(false);
    }

    const conditionalStyles = {
        backgroundImage: img ? `url(${img.src})` : '',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        transition: 'background-image 0.7s ease' // Пример анимации изменения фонового изображения
    };

    return (
        <Link href={'/'} className='mainBlock'
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              style={isOpen ? conditionalStyles : {}}>
            <div className="mainBlock__row">
                <div className="mainBlock__block">
                    <h5>{title}</h5>
                    {icon && <Image src={icon} alt="icon"/>}
                </div>
            </div>
        </Link>
    // <Link to={'/'} className='mainBlock'
    //       onMouseOver={handleMouseOver}
    //       onMouseOut={handleMouseOut}
    //       style={isOpen ? conditionalStyles : {}}>
    //     <div className="mainBlock__row">
    //         <div className="mainBlock__block">
    //             <h5>{title}</h5>
    //             {icon && <img src={icon} alt="icon"/>}
    //         </div>
    //     </div>
    // </Link>
    );
};

export default MainBlock;

// 'use client'
// import React, { useState } from 'react';
// import Link from 'next/link';
// import Image, {StaticImageData} from 'next/image';
//
// const MainBlock = ({ img, title, icon }: { img?: StaticImageData, title: string, icon?: string }) => {
//     const [isOpen, setIsOpen] = useState(false);
//
//     const handleMouseOver = () => {
//         if(img) setIsOpen(true);
//     }
//
//     const handleMouseOut = () => {
//         if(img) setIsOpen(false);
//     }
//
//     const conditionalStyles = {
//         background: `url(${img.src}) no-repeat center/cover`,
//     };
//
//     return (
//         <Link href={'/'}>
//             <div className="mainBlock" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={isOpen ? conditionalStyles : {}}>
//                 <div className="mainBlock__row">
//                     <div className="mainBlock__block">
//                         <h5>{title}</h5>
//                         {icon && <Image src={icon} alt="icon" width={50} height={50} />}
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     );
// };
//
// export default MainBlock;