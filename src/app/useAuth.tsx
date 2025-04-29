'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {useSession} from "next-auth/react";
import {register} from "@/lib/authService";

export default function useAuth(redirectTo: string = '/login') {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const {data: session} = useSession();

  useEffect(() => {

    const token = localStorage.getItem('access_token')
    if(session){
        if (!token){
            const idToken = session.id_token; // Ceci est ton id_token de Google
            console.warn("ID Token:", idToken);
            console.info("session", session);
            localStorage.setItem("user", JSON.stringify({username : session.user?.name, id : session.user?.email}) );
            localStorage.setItem("access_token", idToken as string);
            register({id:null , username:session.user?.name as string, email :session.user?.email as string , enabled: true, role: "USER", tasks:[]})
                .then((result) => {
                    console.info(result)
                })
                .catch((err) => {
                    console.error(err)})
        }

        setIsAuth(true)
    }else if (!token) {
      router.push(redirectTo)
    } else {
      setIsAuth(true)
    }
    setLoading(false)

  }, [session, router, redirectTo])

  return { loading, isAuth }
}
