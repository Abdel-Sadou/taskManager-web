"use client";

import {User} from "@/model/model";
import {createContext, useContext, useState, useEffect, ReactNode} from "react";
type AuthContextType={
    user: User |null,
    login:(user: User)=>void
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children} : { children : ReactNode }) {
    const [user, setUser] = useState<User|null>(null);
    
    const login = (user: User) => {

        setUser(user);
       localStorage.setItem("user",JSON.stringify(user));
    };
    useEffect(() => {
        const u =JSON.parse(localStorage.getItem("user")!) ;
        console.log("AuthContext LOGIN", u)
        if (u){
            setUser(u);
            console.warn("AuthContext LOGIN U---",u)
        }
    }, []);
    return (
        <AuthContext.Provider value={{user, login}}>
            {children}
        </AuthContext.Provider>
    )

}
export const useAuthContext = ()=>{
        const context = useContext(AuthContext);
    console.warn("useAuthContext------------", context)
       /* if (context == null) {
            throw new Error("useAuthContext must be used within a AuthProvider");
        }*/
    return context;
}