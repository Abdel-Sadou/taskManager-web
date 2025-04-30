
import { User} from "@/model/model";
import {create} from "zustand";
import {persist} from "zustand/middleware";

type AuthType = {
    user: User | null,
    token: string | null,
    setToken: (token: string|null) => void
    setUser: (user: User|null ) => void,
}
/*const AuthStore = createStore<AuthType>(
    (set) => ({
        user: null,
        setUser: (user: User|null)=>set({user}),
    })
)*/
const AuthStore = create<AuthType>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setToken : (token )=>set({token}),
            setUser:(user)=> set({user})
        }),
        {
            name: "authStorage"
        }
    )
)
/*const useAuthStore = create(persist(
    (set) => ({
        token: null,
        setToken: (token) => set({ token }),
        logout: () => set({ token: null }),
    }),
    {
        name: 'auth-storage', // <- nom dans localStorage
    }
));*/
export default AuthStore;