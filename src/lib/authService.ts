'use client';
import {JwtPayload, TokenM, User} from "@/model/model";
import {jwtDecode} from "jwt-decode";
import AuthStore from "@/app/AuthStore";


const BASE_URL = "http://localhost:8080";

export const  onSetToken = (response: TokenM) :User |undefined=>{
    const resultToken = decodeToken(response.access_token)
    return resultToken?.user;
    /*
         localStorage.setItem("access_generate_at", JSON.stringify(response.access_generate_at));
         localStorage.setItem("access_expires_in_hours", JSON.stringify(response.access_expires_in_hours));*/
}
export const decodeToken = (token: string) => {
    try {
        return jwtDecode<JwtPayload>(token);
    }catch(err) {
        console.error("token Invalide", err)
        return null;
    }
}
export  default function getAuthHeader() {
    const token = AuthStore.getState().token
    console.warn("TOKEN**************************** ", token)
    if (token) {
        return {
             "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
}

export async function auth({username, password}:{ username: string; password: string }): Promise<TokenM> {
    const res = await fetch("http://localhost:8080/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // ← c’est ça qui est important
        },
        body: JSON.stringify({username, password}),
    });

    if (!res.ok) throw new Error("Une erreur s'est produite !!!!");
    return res.json();

}

export async function authGoogle({idToken}:{ idToken: string}): Promise<TokenM> {
    const res = await fetch("http://localhost:8080/auth/google", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // ← c’est ça qui est important
        },
        body: JSON.stringify({idToken}),
    });

    if (!res.ok) throw new Error("Une erreur s'est produite !!!!");
    return res.json();

}
export async function register(user:User) {
    const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify(user)
    })

    if (!res.ok) throw new Error("Une erreur s'est produite !!!!");
    return res.text();

}