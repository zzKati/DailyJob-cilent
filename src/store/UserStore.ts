import { create } from "zustand"
import type { userState } from "../type/userState"
const useUserStore = create<userState>()(
    (set)=>({
        isLogin:false,
        token:localStorage.getItem('token')||null,
        username:null,
        setIsLogin(value) {
            return set(()=>{
                return {isLogin:value}
            })
        },
        setToken(value) {
            return set(() => ({token:value}))
        },
        setUsername(value) {
            return set(()=>({username:value}))
        },
    })
)

export default useUserStore