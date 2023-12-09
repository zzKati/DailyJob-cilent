// 用户全局变量的类型
export type userState = {
    isLogin:boolean, // 判断用户是否登录
    token:string|null,  // 用户的token
    username:string | null // 用户名
    setIsLogin:(value:boolean)=>void,
    setToken:(value:string|null)=>void
    setUsername:(value:string)=>void
}

