'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {useSession} from "next-auth/react";
import {auth, authGoogle, onSetToken, register} from "@/lib/authService";
import AuthStore from "@/app/AuthStore";

export default function useAuth(redirectTo: string = '/login') {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const {data: session} = useSession();




  useEffect(() => {
      const authStore = AuthStore.getState();
     if (authStore?.token==null) {

         if(session){
             console.warn("{idToken :session.id_token!}", {idToken :session.id_token!})

             authGoogle({idToken :session.id_token!}).then(async (response) => {
                 authStore.setUser(onSetToken(response)??null)
                 authStore.setToken(response.access_token)
                 setIsAuth(true)
                 router.push("/")
                 setLoading(false)
             }).
             catch(err => {
                 console.error(err)
                 setLoading(false)
             });
         }else {
             router.push(redirectTo)
             setLoading(false)
         }

    } else {
      setIsAuth(true)
      setLoading(false)
    }


  }, [session, router, redirectTo])

  return { loading, isAuth }
}
