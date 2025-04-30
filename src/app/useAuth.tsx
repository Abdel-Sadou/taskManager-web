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
  const authStore = useStore(AuthStore);



  useEffect(() => {
      console.log("session", session==undefined);
      console.log("authStore.token", authStore.token)
    if(session!=undefined){
        if (authStore.token==null){
            register({id:null , username:session.user?.name as string, email :session.user?.email as string , enabled: true, role: "USER", tasks:[]})
                .then((idUser) => {
                    authStore.setUser({username : session.user?.name as string, id : Number(idUser)})
                    authStore.setToken(session.id_token!)
                    console.info("***************USER SAVED", {username : session.user?.name as string, id : Number(idUser)})
                })
                .catch((err) => {
                    console.error(err)})
        }

        setIsAuth(true)
    }else if (authStore.token==null) {
        console.log("*********************suis là *****************************************")
       router.push(redirectTo)
    } else {
      setIsAuth(true)
    }
    setLoading(false)

  }, [session, router, redirectTo])

  return { loading, isAuth }
}
