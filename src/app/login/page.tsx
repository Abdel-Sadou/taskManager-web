"use client";
import Link from "next/link";
import {auth, onSetToken} from "@/lib/authService";
import React, {useEffect, useState} from "react";
import {TokenM, User} from "@/model/model";
import {useRouter} from "next/navigation";
import {useStore} from "zustand/react";
import AuthStore from "@/app/AuthStore";
import Image from "next/image";
import {getSession, signIn, useSession} from "next-auth/react";




export default function  Login(){


    const [username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const router = useRouter();
    const [isGoogle, setIsGoogle] = useState(false);
    const authStore =useStore(AuthStore);

    useEffect(()=>{
            /*const authStorage = localStorage.getItem("authStorage");
            if (authStorage!=undefined){
                router.push("/")
            }*/
    })

    const handleLogin = (e:React.FormEvent) => {
            e.preventDefault()
        if (!isGoogle){
            console.warn({username, password})
                auth({username, password}).then(async (response) => {
                    authStore.setUser(onSetToken(response)??null)
                    authStore.setToken(response.access_token)
                    router.push("/")

                }).
                catch(err => {
                    console.error(err)
                });
        }else {
            signIn("google").then(async (response) => {

            }).catch(err=>{
                console.log(err)
            })
           // router.push("/")
        }


    }
    return (
        <div onSubmit={handleLogin} className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Email"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full mb-6 p-2 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Se connecter
                </button>
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">ou</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex justify-center my-4">
                    <button
                        onClick={() =>setIsGoogle(true)}
                        className="flex cursor-pointer items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100"
                    >
                        <Image
                            width={40}
                            height={40}
                            src="/google.png"
                            alt="Google Logo"
                            className="w-6 h-6 mr-2"
                        />
                        Se connecter avec Google
                    </button>
                </div>
                <p className="text-sm text-center mt-4">
                    Pas encore de compte ? <Link href="/register" className="text-blue-600">Inscription</Link>
                </p>
            </form>
        </div>
    )
}