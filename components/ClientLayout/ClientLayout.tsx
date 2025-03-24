"use client"
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';


function ClientLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isDark, setIsDark]=useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null) {
            router.push("/dashboard");
        }else{
            router.push("/");
        }
    }, []);

    return (
        <div className={`${isDark===true ? "bg-black text-white" : ""}`}>
            <Toaster />
            {/* Header feature */}
            {pathname !== "/" &&
                <Header isDark={isDark} setIsDark={setIsDark} />
            }
            <div className='flex'>
                {pathname !== "/" &&
                    <Sidebar isDark={isDark} />
                }
                {children}
            </div>
        </div>
    )
}

export default ClientLayout