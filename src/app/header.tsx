"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {signOut} from "next-auth/react";
import {useStore} from "zustand/react";
import AuthStore from "@/app/AuthStore";
import {onSetToken} from "@/lib/authService";



export default function Header(){
    const router = useRouter();
    const authStore = useStore(AuthStore);


    const deconnexion = ()=>{
        if(confirm("Déconnexion?")){
            authStore.setUser(null);
            authStore.setToken(null);
            router.push("/");
            signOut().then();
            alert("Deconnexion réussie");
        }

    }
    return (
        <div>
            <header className="bg-gray-800 text-white px-6 py-4 shadow-md flex justify-between items-center">
                <div className="text-xl font-semibold">
                    Bonjour, <span className="text-blue-400">{authStore.user?.username}</span>
                </div>
                {/* Tu peux ajouter des éléments à droite ici, comme un avatar, une icône de déconnexion, etc. */}
                <div className="flex items-center gap-4">
                    <button className="hover:text-gray-300" onClick={deconnexion}>Déconnexion</button>
                </div>
            </header>
        </div>
    )
}