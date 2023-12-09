import type { messionList } from "../../../type/messageData"
import Mession from "./Mession";
function MessionList(props:{messionList:messionList,mesIndex:number}) {
    const messionList = props.messionList
    const list = messionList.map((item,index)=> <Mession key={item.id} mession={item} step={index} mesIndex={props.mesIndex} type={1}></Mession>)
    return ( <div className=" w-full flex mt-2">
        {list}
    </div> );
}

export default MessionList;