import type { messageList } from "./messageData"


// 任务管理的状态管理类型
export type mesState = {
    data:messageList, // 数据
    setData:(value:messageList)=>void // 给数据赋值 后续还有给数据添加 任务,
    setStatus:(mesIndex:number,index:number)=>void  // 设置进程的状态 是否被完成
}