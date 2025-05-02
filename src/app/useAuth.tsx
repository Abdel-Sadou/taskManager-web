'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {useSession} from "next-auth/react";
import {onSetToken, register} from "@/lib/authService";
import {useStore} from "zustand/react";
import AuthStore from "@/app/AuthStore";

export default function useAuth(redirectTo: string = '/login') {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const {data: session} = useSession();




  useEffect(() => {
      const authStore = typeof window !== "undefined" ? AuthStore.getState() : null;
      console.log("session", session)
    if(session){
        authStore?.setToken(session.id_token!)

        if (authStore?.token==null){
            register({id:null , username:session.user?.name as string, email :session.user?.email as string , enabled: true, role: "USER", tasks:[]})
                .then((idUser) => {
                    console.info("***************USER SAVED", {username : session.user?.name as string, id : Number(idUser)})
                    authStore?.setUser({username : session.user?.name as string, id : Number(idUser)})
                    setIsAuth(true)
                })
                .catch((err) => {
                    console.error(err)
                    setIsAuth(false)
                })
        }
        setIsAuth(true)
        return;
    }else if (authStore?.token==null) {
        console.log("*********************suis là redirectTo*****************************************")
       router.push(redirectTo)
    } else {
      setIsAuth(true)
    }
    setLoading(false)

  }, [session, router, redirectTo])

  return { loading, isAuth }
}
