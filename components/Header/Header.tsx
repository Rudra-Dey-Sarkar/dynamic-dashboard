"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// controller to activate or deactivate logout option
function controlUserActive(isUserActive: boolean, setUserActive: React.Dispatch<React.SetStateAction<boolean>>) {
    if (isUserActive === false) {
        setUserActive(true);
    } else {
        setUserActive(false);
    }
}
// Logout controller
function controlLogout(router: AppRouterInstance) {
    localStorage.removeItem("token");
    router.push("/");
}

function Header() {
    const router = useRouter();
    const [isUserActive, setUserActive] = useState<boolean>(false);
    return (
        <div className='p-5 border-b-1 border-green-500 flex justify-end'>
            <div className='relative'>
                <button
                    className='border-2 border-green-500 py-1 px-4 rounded-[10px] text-[1.2rem] text-gray-500 font-bold hover:cursor-pointer hover:scale-105'
                    onClick={() => controlUserActive(isUserActive, setUserActive)}>User</button>

                {isUserActive === true &&
                    <div className='absolute right-1 top-11 flex justify-center w-[100px] bg-gray-100 p-5'>
                        <button
                            className='text-red-500 font-semibold border-2 border-red-500 py-1 px-4 rounded-[10px] hover:cursor-pointer hover:scale-105'
                            onClick={() => controlLogout(router)}>Logout</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header