"use client";
import {PropsWithChildren} from "react";

import useAuth from "@/app/useAuth";

export  default function  ProtectedPage({children}:PropsWithChildren) {

    const {loading,isAuth}= useAuth()
        
        
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce bounce-fast [animation-delay:-0.3s]"></span>
                    <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce bounce-fast [animation-delay:-0.15s]"></span>
                    <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce bounce-fast"></span>
                </div>
            </div>
        );
    }else
     if(isAuth) {
      return  (<>{children}</>)
    } /*: (
        
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex space-x-2">
                ERROR
            </div>
        </div>
    );*/
}