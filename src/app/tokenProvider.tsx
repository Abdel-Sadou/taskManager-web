"use client";
import {createContext, ReactNode, useContext, useState} from "react";

type tokenType = {
    token :string ;
    setAccessToken:(token:string) =>void;
}

const TokenContext = createContext<tokenType|undefined>(undefined);

export function TokenProvider({children}:{children:ReactNode}) {
    const [token, setToken] = useState<string>("");
    const setAccessToken = (token:string) => {
        setToken(token);
    }
    return (<TokenContext.Provider  value={{token, setAccessToken}}>
        {children}
    </TokenContext.Provider>)

}
export const useTokenContext= ()=>{
    return useContext(TokenContext);
}