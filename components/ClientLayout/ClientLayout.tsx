"use client"
import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

function ClientLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null) {
            router.push("/dashboard");
        }else{
            router.push("/");
        }
    }, []);

    return (
        <div>
            <Toaster />
            {/* Header feature */}
            {pathname !== "/" &&
                <Header />
            }
            <div className='flex'>
                {pathname !== "/" &&
                    <Sidebar />
                }
                {children}
            </div>
        </div>
    )
}

export default ClientLayout