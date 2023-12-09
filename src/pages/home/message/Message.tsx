import type { message } from "../../../type/messageData";
import MessionList from "./MessionList";
import showDialog from "../../../components/showDialog";
import mesApi from "../../../api/mesApi";
import useMesStore from "../../../store/MesStore";
function Message(props: { mes: message; mesIndex: number }) {
  const { setData, data } = useMesStore();

  type time = {
    year: number;
    month: number;
    day: number;
    hour: number;
    weekday: number;
  };

  const mes = props.mes;
  // 开始日期
  const startDate = new Date(mes.startTime);
  const startTime: time = {
    year: startDate.getFullYear(),
    month: startDate.getMonth() + 1,
    day: startDate.getDate(),
    hour: startDate.getHours(),
    weekday: startDate.getDay(),
  };

  // 结束日期
  const endDate = new Date(mes.endTime);
  const endTime: time = {
    year: endDate.getFullYear(),
    month: endDate.getMonth() + 1,
    day: endDate.getDate(),
    hour: endDate.getHours(),
    weekday: endDate.getDay(),
  };

  // 当前日期
  const nowDate = new Date(Date.now());
  const nowTime: time = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    day: nowDate.getDate(),
    hour: nowDate.getHours(),
    weekday: nowDate.getDay(),
  };

  // 数字转中文数字
  const numberToChinese = (weekday: number): string => {
    const numArray = ["零", "一", "二", "三", "四", "五", "六", "七"];
    return numArray[weekday];
  };

  // 时间进度
  const timeProgress =
    ((Date.now() - mes.startTime) / (mes.endTime - mes.startTime)) * 100;
  //   console.log(timeProgress);

  // 任务进度
  // 已经完成的任务数量
  const messoinComplete = mes.messionList.filter(
    (item) => item.status === 1
  ).length;
  const messionProgerss = (messoinComplete / mes.messionList.length) * 100;

  // 进度提示
  let progressType: string;
  if (messionProgerss - timeProgress > 0) {
    progressType = "bg-green-400";
  } else if (messionProgerss - timeProgress > -20) {
    progressType = "bg-orange-400";
  } else {
    progressType = "bg-red-500";
  }

  // 确认删除函数
  const onConfirm = () => {
    mesApi
      .post("/deleteMessage", {
        index: props.mesIndex,
      })
      .then((res) => {
        if (res.data === "success") {
          const newData = data;
          newData.splice(props.mesIndex, 1);
          setData(newData);
        }
      })
      .catch(() => {
        alert("删除失败");
      });
  };

  // 删除任务
  const deleteMessage = () => {
    showDialog(`是否删除任务:${mes.messageName}`, onConfirm, () => {});
  };

  return (
    <div className=" p-3">
      <div className=" flex">
        <img src="/note.svg" className=" w-8 mr-2"></img>
        <div className="font-bold text-2xl">{mes.messageName}</div>
        <div className="flex-1">
          <button
            className=" float-right p-3 bg-white text-sky-400 shadow rounded-sm font-semibold duration-200
           hover:bg-sky-400 hover:text-white hover:shadow-md"
            onClick={deleteMessage}
          >
            删除任务
          </button>
        </div>
      </div>
      <div>
        <MessionList
          messionList={mes.messionList}
          mesIndex={props.mesIndex}
        ></MessionList>
      </div>
      <div className=" mt-4 w-full aspect-[8/1] bg-blue-400 rounded-lg p-3">
        <div className=" flex">
          <span className=" text-white font-semibold text-xl flex-1">
            日期:
            {`${nowTime.year}年${nowTime.month}月${
              nowTime.day
            }日  周${numberToChinese(nowTime.weekday)}`}
          </span>
          <span className=" text-white">
            <span className=" pr-2">
              <svg
                className=" w-6 h-6 text-white inline"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            <span className=" pr-2">
              <span className=" font-semibold">Start:</span>:
              {`${startTime.month}月${startTime.day}日${startTime.hour}时`}
            </span>
            <span>
              <span className=" font-semibold">End:</span>
              {`${endTime.month}月${endTime.day}日${endTime.hour}时`}
            </span>
          </span>
        </div>
        <div className=" flex mt-2">
          <div
            className={` w-6 h-6 rounded-full duration-500 ${progressType}`}
          ></div>
          <div></div>
        </div>
        <div className=" text-white font-semibold mt-3">
          时间进度:
          <div className=" w-full h-3 bg-blue-200 rounded-lg relative overflow-hidden mt-2">
            <div
              className=" absolute left-0 right-0 h-full bg-blue-700"
              style={{ width: `${timeProgress}%` }}
            ></div>
          </div>
        </div>
        <div className=" text-white font-semibold mt-3">
          任务进度:
          <div className=" w-full h-3 bg-slate-200 rounded-lg relative overflow-hidden mt-2">
            <div
              className=" absolute left-0 right-0 h-full bg-sky-400 duration-500"
              style={{ width: `${messionProgerss}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
