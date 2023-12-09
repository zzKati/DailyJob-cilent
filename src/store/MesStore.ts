import { create } from "zustand"
import { mesState } from "../type/MesState"
const useMesStore = create<mesState>()(
    (set)=>({
        data:[],
        setData(value) {
            return set(()=>({data:value}))
        },
        setStatus(mesIndex, index) {
            return set((state)=>{
                const updateData = [...state.data]
                updateData[mesIndex].messionList[index].status = 1
                return {data:updateData}
            })
        },
    }
))

export default useMesStore