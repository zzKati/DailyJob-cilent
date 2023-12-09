import Message from "./Message";
import { useEffect, useState } from "react";
import mesApi from "../../../api/mesApi";
import useMesStore from "../../../store/MesStore";
import Loading from "../../../components/Loading";
import AddMessage from "./AddMessage";
function MessageList() {
  // 从这里发送请求 得到数据
  const { data, setData } = useMesStore();
  const [isPending, setIsPending] = useState<boolean>(false);
  useEffect(() => {
    // 发送请求获取 数据

    mesApi
      .get("/message")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setIsPending(true);
      })
      .catch(() => {
        console.log("获取数据失败");
      });
  }, []);

  const list = data.map((item, index) => (
    <Message mes={item} key={item.id} mesIndex={index}></Message>
  ));
  return isPending ? (
    <div className="h-screen overflow-auto">
      <AddMessage></AddMessage>
      <div className=" w-4/5 min-w-[1000px] mx-auto mt-10 rounded-xl shadow-md">
        {list}
      </div>
    </div>
  ) : (
    <Loading></Loading>
  );
}

export default MessageList;
