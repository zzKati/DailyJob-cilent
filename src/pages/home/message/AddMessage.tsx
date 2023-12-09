import { useState } from "react";
import MessageForm from "./MessageForm"
function AddMessage() {
    // 用于添加任务的组件
    const [isShow, setIsshow] = useState(false)

    const cancel = () => {
        setIsshow(false)
    }

    return ( <div className=" w-4/5 min-w-[1000px] mx-auto mt-10 rounded-xl shadow-md p-3 overflow-hidden">
        {!isShow?<div className=" w-full h-60 bg-sky-200 group hover:bg-sky-300 flex flex-col items-center justify-center duration-200 cursor-pointer" onClick={()=>{setIsshow(()=>true)}}>
            <div className=" w-40 aspect-square mx-auto rounded-full bg-sky-300
            flex items-center justify-center font-bold text-sky-500 text-9xl group-hover:bg-sky-400 group-hover:text-sky-700">
                <div>&#xFF0B;</div>
            </div>
            <div className=" text-slate-600 text-xl mt-1 font-bold">
                添加新任务
            </div>
        </div>:<MessageForm cancel={cancel}></MessageForm>}
    </div> );
}

export default AddMessage;