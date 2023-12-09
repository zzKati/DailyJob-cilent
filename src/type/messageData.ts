// 单个进程
export type mession = {
    name:string,  // 进程的名字
    status:number  // 进程的状态 1为已经完成 0为未完成,
    id:string,
    expectedTime:{ //预计花费的时间
        day:number,
        hour:number,
        mintues:number
    } 
}

// 单个任务中 分多个进程 如 完成机器学习作业 分成 1.寻找论文  2.寻找代码 3.翻译并阅读论文 4.改良代码 5.写ppt
// 进程集合
export type messionList = Array<mession>

// 单个 任务的类型
export type message = {
    id:string //任务的唯一表示
    messageName:string, // 任务的名字
    startTime:number, // 开始时间 时间戳
    endTime:number, // 结束时间 时间戳
    progress:number // 进度 取值为 0-100 
    messionList:messionList //任务集合
}

export type messageList = Array<message>

