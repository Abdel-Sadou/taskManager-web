'use client';
import React, {useState} from "react";
import {register} from "@/lib/authService";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {signIn, signOut} from "next-auth/react";
import AuthStore from "@/app/AuthStore";

export default function Page () {

    const [username, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isGoogle, setIsGoogle] = useState(false);
    const [isMacth, setIsMacth] = useState(false);
    const  router  = useRouter();
    async function  handleRegister (e : React.FormEvent) {
        if (!isMacth){
            alert("les mots de passes ne correspondent pas !!!");
            return;
        }
        e.preventDefault();
        if (isGoogle){
            await signOut();
            AuthStore.setState({user: null, token: null});
            await signIn("google");
        }else {
            register({id:null , username:username,password : password, email :email , enabled: true, role: "USER", tasks:[]})
                .then((result) => {
                    console.info(result)
                    router.push("/");
                })
                .catch((err) => {
                    console.error(err)})
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>

                <input
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="username"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full mb-6 p-2 border border-gray-300 rounded"
                />

                <input
                    onChange={(e) => setIsMacth(e.target.value == password)}
                    type="password"
                    placeholder="Retapper Mot de passe"
                    className="w-full mb-6 p-2 border border-gray-300 rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 cursor-pointer text-white py-2 rounded hover:bg-green-700"
                >
                    S’inscrire
                </button>

                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">ou</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex justify-center items-center my-4">
                    <button
                        onClick={() => setIsGoogle(true)}
                        className="flex cursor-pointer justify-center items-center w-full px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100"
                    >
                        <Image
                            width={40}
                            height={40}
                            src="/google.png"
                            alt="Google Logo"
                            className="w-6 h-6 mr-2"
                        />
                        S'inscrire avec Google
                    </button>
                </div>
                <p className="text-sm text-center mt-4">
                    Déjà inscrit ? <a href="/login" className="text-blue-600">Connexion</a>
                </p>
            </form>
        </div>
    );
}