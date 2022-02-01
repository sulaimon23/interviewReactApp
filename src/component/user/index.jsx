import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// 
export const User = ({ children }) => {
    return (
        <div className="overflow-auto p-8 h-full">
            <ToastContainer />
            <h1 className="font-bold text-gray-900 text-2xl" >Dashboard</h1>
            <div className="flex items-center justify-center  w-full">
                <div className="w-full  md:w-3/4">
                    {children}
                </div>
            </div>
        </div>
    )
};
