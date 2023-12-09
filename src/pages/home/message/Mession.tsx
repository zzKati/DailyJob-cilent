import type { mession } from "../../../type/messageData";
import useMesStore from "../../../store/MesStore";
import mesApi from "../../../api/mesApi";
function Mession(props: {
  mession: mession;
  step: number;
  mesIndex: number;
  type: number;
}) {
  const { setStatus } = useMesStore();
  // 单个进程
  const mession = props.mession;
  // 预计时间
  const { hour, mintues, day } = mession.expectedTime;

  // 将步骤修改成已完成
  const updateStatus = () => {
    if (props.type === 1) {
      mesApi
        .post("/changeStatus", {
          mesIndex: props.mesIndex,
          step: props.step,
        })
        .then((res) => {
          if (res.data === "success") {
            setStatus(props.mesIndex, props.step);
          } else {
            throw new Error("修改失败");
          }
        })
        .catch(() => {
          alert("修改失败");
        });
    }
  };
  return (
    <div className=" w-1/6 min-w-[200px] overflow-hidden">
      <div
        className={`w-11/12 h-44 min-w-[50%] bg-white box-border rounded-lg
        shadow-sm overflow-hidden relative cursor-pointer ${
          mession.status === 1 ? "bg-slate-50" : ""
        }`}
        onClick={updateStatus}
      >
        <div
          className={`w-2/5 h-8 min-w-max bg-sky-400 mx-auto mt-2 rounded-2xl leading-8 text-center text-white font-semibold ${
            mession.status === 1 ? "bg-slate-100 text-slate-400" : ""
          }`}
        >
          step {props.step + 1}
        </div>
        <div
          className={` px-5 text-center mt-1 font-bold text-xl relative ${
            mession.status === 1
              ? " line-through decoration-slate-400 text-slate-400"
              : ""
          }`}
        >
          {mession.name}
        </div>
        <div
          className={` absolute bottom-3 text-center w-full text-slate-400 ${
            mession.status === 1 ? " text-slate-100" : ""
          }`}
        >
          预计时间:
          <br />
          {day > 0 ? `${day}天` : ""}
          {hour > 0 ? `${hour}小时` : ""}
          {mintues > 0 ? `${mintues}分钟` : ""}
        </div>
      </div>
    </div>
  );
}

export default Mession;
