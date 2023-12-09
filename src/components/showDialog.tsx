import ReactDOM from "react-dom";
import ReactDom from "react-dom/client";
import { useState, useEffect } from "react";

function showDialog(
  message: string,
  onConfirm: () => void,
  onCancel: () => void
) {
  function Dialog(props: {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }) {
    // 是否展示组件
    const [isShow, setIsShow] = useState(true);

    // 确认删除函数
    const confirm = () => {
      props.onConfirm();
      // 取消挂载组件
      setIsShow(false);
    };

    // 取消删除函数
    const cancel = () => {
      props.onCancel();
      //取消挂载组件
      setIsShow(false);
    };

    useEffect(() => {
      return () => {
        document.body.removeChild(container);
      };
    });

    if (!isShow) {
      return null;
    }
    return ReactDOM.createPortal(
      <div className=" fixed w-screen h-screen bg-black bg-opacity-10 z-50 top-0 left-0 bottom-0 right-0 flex items-center justify-center">
        <div className=" bg-white w-48 h-48 rounded flex justify-center items-center flex-col p-3">
          <div className=" font-bold mb-2 text-xl text-center">
            {props.message}
          </div>
          <div>
            <button
              onClick={cancel}
              className=" bg-sky-400 text-white shadow hover:bg-white hover:text-sky-400 duration-100 p-3 border rounded font-semibold mr-2 hover:shadow-lg"
            >
              取消
            </button>
            <button
              onClick={confirm}
              className="duration-100 p-3 border bg-blue-700 text-white hover:bg-red-500 rounded shadow font-semibold hover:shadow-lg"
            >
              确认
            </button>
          </div>
        </div>
      </div>,
      container
    );
  }
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = ReactDom.createRoot(container);
  root.render(
    <Dialog message={message} onConfirm={onConfirm} onCancel={onCancel} />
  );
}

export default showDialog;
