"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {signOut} from "next-auth/react";



export default function Header(){
    const router = useRouter();
    const [username, setUsername] =useState("");

    useEffect(() => {
      const u =  localStorage.getItem("user") ;
      if(u){
          setUsername(JSON.parse(u).username);
      }
    },[])
    const deconnexion = ()=>{
        if(confirm("Déconnexion?")){
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            router.push("/");
            alert("Deconnexion réussie");
            signOut().then();
        }

    }
    return (
        <div>
            <header className="bg-gray-800 text-white px-6 py-4 shadow-md flex justify-between items-center">
                <div className="text-xl font-semibold">
                    Bonjour, <span className="text-blue-400">{username}</span>
                </div>
                {/* Tu peux ajouter des éléments à droite ici, comme un avatar, une icône de déconnexion, etc. */}
                <div className="flex items-center gap-4">
                    <button className="hover:text-gray-300" onClick={deconnexion}>Déconnexion</button>
                </div>
            </header>
        </div>
    )
}