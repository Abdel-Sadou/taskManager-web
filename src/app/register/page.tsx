'use client';
import React, {useState} from "react";
import {register} from "@/lib/authService";
import {useRouter} from "next/navigation";

export default function Page () {

    const [username, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isMacth, setIsMacth] = useState(false);
    const  router  = useRouter();
    async function  handleRegister (e : React.FormEvent) {
        if (!isMacth){
            alert("les mots de passes ne correspondent pas !!!");
            return;
        }
        e.preventDefault();
        register({id:null , username:username,password : password, email :email , enabled: true, role: "USER", tasks:[]})
            .then((result) => {
                console.info(result)
                router.push("/");
            })
            .catch((err) => {
                console.error(err)})
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
                    onChange={(e) =>setPassword(e.target.value)}
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full mb-6 p-2 border border-gray-300 rounded"
                    />

                <input
                    onChange={(e) =>setIsMacth(e.target.value==password)}
                    type="password"
                    placeholder="Retapper Mot de passe"
                    className="w-full mb-6 p-2 border border-gray-300 rounded"
                    />

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    S’inscrire
                </button>

                <p className="text-sm text-center mt-4">
                    Déjà inscrit ? <a href="/login" className="text-blue-600">Connexion</a>
                </p>
            </form>
        </div>
    );
}