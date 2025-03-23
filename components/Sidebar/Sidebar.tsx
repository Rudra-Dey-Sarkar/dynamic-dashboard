"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// Controller for sidebar open close feature
function controlSidebar(isSidebarOpen: boolean, setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>) {
    if (isSidebarOpen === false) {
        setIsSidebarOpen(true);
    } else {
        setIsSidebarOpen(false);
    }
}

function Sidebar() {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
     
    useEffect(()=>{
        if(window.innerWidth<640){
        setIsSidebarOpen(false);
        }else{
        setIsSidebarOpen(true);
        }
    },[])

    return (
        <div className='absolute sm:relative bg-white border-r-1 border-green-500 py-2 min-h-[100vh] w-fit'>
            <div className='flex justify-end p-2 mb-7'>
                <button
                    className='grid gap-y-1 hover:cursor-pointer'
                    onClick={() => controlSidebar(isSidebarOpen, setIsSidebarOpen)}>
                    <div className='bg-black w-[25px] h-[2px]' />
                    <div className='bg-black w-[25px] h-[2px]' />
                    <div className='bg-black w-[25px] h-[2px]' />
                </button>
            </div>

            <div className={`grid ${isSidebarOpen === true ? "visible" : "hidden"}`}>
                <Link
                    href="/dashboard"
                    className={`${pathname === "/dashboard" ? "bg-green-200 rounded-r-full" : ""} py-2 px-5 border-b-1 border-gray-200 font-semibold hover:bg-green-200 text-center`}>Dashboard</Link>

                <Link
                    href="/setting"
                    className={`${pathname === "/setting" ? "bg-green-200 rounded-r-full" : ""} py-2 px-5 border-b-1 border-gray-200 font-semibold hover:bg-green-200 text-center`}>Setting</Link>

                <Link
                    href="/profile"
                    className={`${pathname === "/profile" ? "bg-green-200 rounded-r-full" : ""} py-2 px-5 border-b-1 border-gray-200 font-semibold hover:bg-green-200 text-center`}>Profile</Link>
            </div>
        </div>
    )
}

export default Sidebar