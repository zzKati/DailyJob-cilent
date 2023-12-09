function Loading() {
    // 加载时的动画
    return <div className=" w-48 relative mx-auto mt-10 mb-10">
        <div className=" w-full aspect-square rounded-full border-t-[20px] border-r-[20px] 
    border-r-transparent border-t-sky-400 after:absolute after:left-0 after:top-0 after:w-48
    after:aspect-square after:border-b-[20px] after:border-l-[20px] after:rounded-full after:border-l-transparent
    after:border-b-blue-400 animate-spin">
        </div>
    </div>
}

export default Loading;    