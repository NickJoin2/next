'use client'
import React from 'react';
import GlavnayFrame from "@/widgets/Glavnay/ui/GlavnayFrame";
import glavnayControl from "@/shared/image/glavnay/glavnayTest.png";
import RequireAuth from "@/app/hoc/RequireAuth";
import requireAuth from "@/app/hoc/RequireAuth";

const Page = () => {
    return (
        <RequireAuth rolesToCheck={['admin', 'student']}>
            <GlavnayFrame text={'Перейти в управление'}/>
        </RequireAuth>

        // <GlavnayFrame text={'Перейти в управление'} img={control}/>
    );
};

export default Page;