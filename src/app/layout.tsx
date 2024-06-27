import React from "react";

import Context from "@/app/hoc/Context";

import './style.scss';

import {Footer} from "@/widgets/footer";
import {Header} from "@/widgets/header";
import {Providers} from "@/app/store/provider";
import {PageTransition} from "@/features/pageTransition";

export default function RootLayout({children}: { children: React.ReactNode }) {

    return (
        <html lang="ru">
        <body>
        <Providers>
            <Context>
                <Header/>
                <main>
                    <PageTransition>
                        {children}
                    </PageTransition>
                </main>
                <Footer/>
            </Context>
        </Providers>
        </body>
        </html>
    );
}
