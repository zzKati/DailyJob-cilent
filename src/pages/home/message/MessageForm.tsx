import { useState } from "react";
import type { messionList, mession } from "../../../type/messageData";
import { nanoid } from "nanoid";
import Mession from "./Mession";
import mesApi from "../../../api/mesApi";
import useMesStore from "../../../store/MesStore";

function MessageForm(props: { cancel: () => void }) {
  // 判断 进程 是否正在输入
  const [isFocus, setIsFocus] = useState(false);

  // 任务的名称
  const [messageName, setMessageName] = useState("");

  // 获取当前时间或者参数时间的 'yyyy-mm-dd' 格式
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // 比较哪个时间晚
  function compareDates(dateString1: string, dateString2: string) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    if (date1 > date2) {
      // 第一个时间比较晚
      return 1;
    } else if (date1 < date2) {
      // 第二个时间比较晚
      return -1;
    } else {
      return 0;
    }
  }

  // 获取开始时间
  const [startTime, setStartTime] = useState(getCurrentDate());

  // 获取结束时间
  const [endTime, setEndTime] = useState(getCurrentDate());

  // 获取任务列表数据 当请求成功后添加数据到列表中
  const { data, setData } = useMesStore();

  // 获取步骤集合
  const [messionList, setMessionList] = useState<messionList>([]);

  // 输入的步骤 (mession)
  const [messsion, setMession] = useState<mession>({
    name: "",
    status: 0,
    id: nanoid(),
    expectedTime: {
      day: 0,
      hour: 0,
      mintues: 0,
    },
  });

  // 更新步骤名的函数
  const updateMessionName = (e) => {
    setMession(() => ({ ...messsion, name: e.target.value }));
  };

  // 取消提交表单函数
  const cancelSubmit = () => {
    setIsFocus(false);
  };

  // 提交进程函数
  const submitMession = () => {
    const { day, hour, mintues } = messsion.expectedTime;
    if (day >= 0 && hour >= 0 && mintues >= 0 && messsion.name) {
      setMessionList([...messionList, messsion]);
      setIsFocus(false);
      setMession({
        name: "",
        status: 0,
        id: nanoid(),
        expectedTime: {
          day: 0,
          hour: 0,
          mintues: 0,
        },
      });
    } else {
      alert("值不合法");
    }
  };

  // 取消提交表单函数
  const cancel = () => {
    props.cancel();
  };

  // 提交表单函数
  const submit = () => {
    // 判断不为空
    /*
    提交的数据
    id:string //任务的唯一表示
    messageName:string, // 任务的名字
    startTime:number, // 开始时间 时间戳
    endTime:number, // 结束时间 时间戳
    progress:number // 进度 取值为 0-100 
    messionList:messionList //任务集合
    */
    if (messageName && startTime && endTime) {
      mesApi
        .post("/addMessage", {
          messageName,
          startTime: Date.parse(startTime),
          endTime: Date.parse(endTime),
          messionList,
        })
        .then((res) => {
          // console.log(res);
          if (res.data === "success") {
            setData([...data]);
            props.cancel();
          }
          window.location.reload();
        })
        .catch(() => {
          alert("添加失败");
        });
    }
  };

  // 渲染列表
  const list = messionList.map((item, index) => (
    <Mession
      key={item.id}
      type={0}
      step={index}
      mession={item}
      mesIndex={0}
    ></Mession>
  ));

  return (
    <>
      <div className=" flex">
        <div className=" flex-1">
          <span className=" text-blue-500 font-semibold text-base">
            任务名称
          </span>
          <br />
          <input
            className=" mt-1 outline-none border-2 focus:border-sky-400 w-4/5 rounded p-1"
            placeholder="任务的名称"
            value={messageName}
            onChange={(e) => setMessageName(() => e.target.value)}
          ></input>
        </div>
        <div className=" flex-1">
          <span className=" text-blue-500 font-semibold text-base">
            开始时间
          </span>
          <br />
          <input
            className=" mt-1 outline-none border-2 focus:border-sky-400 w-4/5 rounded p-1"
            type="date"
            value={startTime}
            onChange={(e) => setStartTime(() => e.target.value)}
          ></input>
        </div>
        <div className=" flex-1">
          <span className=" text-blue-500 font-semibold text-base">
            结束时间
          </span>
          <br />
          <input
            className=" mt-1 outline-none border-2 focus:border-sky-400 w-4/5 rounded p-1"
            min={
              compareDates(getCurrentDate(), startTime) === 1
                ? getCurrentDate()
                : startTime
            }
            type="date"
            value={endTime}
            onChange={(e) => setEndTime(() => e.target.value)}
          ></input>
          <br />
        </div>
      </div>
      <div className=" flex mt-3 w-full">
        {list}
        <div className="w-1/6 min-w-[200px] overflow-hidden">
          {!isFocus ? (
            <div
              className="w-11/12 h-44 min-w-[50%] bg-sky-200 group hover:bg-sky-300 duration-200 box-border rounded-lg
                    shadow-sm overflow-hidden cursor-pointer flex flex-col items-center justify-center"
              onClick={() => setIsFocus(true)}
            >
              <div
                className=" w-32 aspect-square bg-sky-300 rounded-full flex font-bold
                     justify-center items-center text-6xl text-sky-400 group-hover:bg-sky-400 group-hover:text-sky-500"
              >
                &#xFF0B;
              </div>
              <div className=" font-semibold text-slate-600">添加新步骤</div>
            </div>
          ) : (
            <div className="w-11/12 h-52 min-w-[50%] shadow-sm rounded-lg bg-white p-2">
              <div className=" ml-1 text-blue-500 font-semibold">
                步骤名称
                <input
                  className=" p-1 rounded outline-none border-2 w-full focus:border-sky-400 inline"
                  placeholder="步骤名称"
                  value={messsion.name}
                  onChange={updateMessionName}
                ></input>
              </div>
              <div className="ml-1 text-blue-500 font-semibold mb-1">
                预计时间(天,小时,分钟)
              </div>
              <div className=" flex">
                <input
                  className=" p-1 w-full rounded outline-none border-2 focus:border-sky-400"
                  type="number"
                  placeholder="天"
                  min={0}
                  value={messsion.expectedTime.day}
                  onChange={(e) => {
                    setMession(() => ({
                      ...messsion,
                      expectedTime: {
                        ...messsion.expectedTime,
                        day: parseInt(e.target.value),
                      },
                    }));
                  }}
                ></input>
                <input
                  className=" p-1 w-full rounded outline-none border-2 focus:border-sky-400"
                  type="number"
                  placeholder="小时"
                  min={0}
                  max={23}
                  value={messsion.expectedTime.hour}
                  onChange={(e) => {
                    setMession(() => ({
                      ...messsion,
                      expectedTime: {
                        ...messsion.expectedTime,
                        hour: parseInt(e.target.value),
                      },
                    }));
                  }}
                ></input>
                <input
                  className=" p-1 w-full rounded outline-none border-2 focus:border-sky-400"
                  type="number"
                  placeholder="分钟"
                  min={0}
                  max={60}
                  value={messsion.expectedTime.mintues}
                  onChange={(e) => {
                    setMession(() => ({
                      ...messsion,
                      expectedTime: {
                        ...messsion.expectedTime,
                        mintues: parseInt(e.target.value),
                      },
                    }));
                  }}
                ></input>
              </div>
              <div className=" float-right mt-2">
                <button
                  className=" text-sky-400 font-semibold p-1.5 shadow hover:bg-sky-400 hover:text-white duration-100 mr-2 rounded-sm"
                  onClick={cancelSubmit}
                >
                  取消
                </button>
                <button
                  className=" hover:text-sky-400 hover:bg-white font-semibold p-1.5 shadow bg-sky-400 text-white duration-100 rounded-sm"
                  onClick={submitMession}
                >
                  添加
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" float-right">
        <button
          className=" w-20 aspect-video text-sky-400 bg-white font-bold shadow
               rounded duration-200 hover:bg-sky-400 hover:text-white mr-3 hover:shadow-md"
          onClick={cancel}
        >
          取消
        </button>
        <button
          className=" w-20 aspect-video text-white bg-sky-400 font-bold shadow
               rounded duration-200 hover:bg-white hover:text-sky-400 hover:shadow-md"
          onClick={submit}
        >
          提交
        </button>
      </div>
    </>
  );
}

export default MessageForm;
