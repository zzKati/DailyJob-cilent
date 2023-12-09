import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/UserStore";
import useApi from "../api/userApi";
function Login() {
  // 输入框是否输入变量的类型
  type isFocus = {
    username: boolean;
    password: boolean;
  };
  // 创建用户名变量
  const [username, setUsername] = useState("");

  // 创建密码变量
  const [password, setPassword] = useState("");

  // 存储用户名输入框是否输入的变量
  const [isFocus, setIsFocus] = useState<isFocus>({
    username: false,
    password: false,
  });

  // 跳转路由函数
  const navigate = useNavigate();

  // 定义用户全局信息
  const { setIsLogin, setToken, setUsername: setUserName } = useUserStore();

  // 输入框正在输入时修改变量的函数
  const userInputFocus = () =>
    setIsFocus(() => {
      return { ...isFocus, username: true };
    });
  const passwordInputFocus = () =>
    setIsFocus(() => {
      return { ...isFocus, password: true };
    });

  // 输入框离开输入状态时修改变量的函数
  const userInputBlur = () => setIsFocus({ ...isFocus, username: false });
  const passwordInputBlur = () => setIsFocus({ ...isFocus, password: false });

  // 数据双向绑定
  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  // 用户注册函数
  const register = (): void => {
    if (username === "" || password === "") {
      alert("用户名或密码不能为空");
    } else {
      useApi
        .post("/register", {
          username,
          password,
        })
        .then((res) => {
          // 注册成功 存储token
          const token = res.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("login", "1");
          setIsLogin(true);
          setToken(token);

          setUserName(res.data.username);
          navigate("/", { replace: true });
          window.location.reload();
        })
        .catch(() => {
          alert("注册失败");
        });

      setUsername(() => "");
      setPassword(() => "");
    }
  };

  // 用户登录函数
  const login = (): void => {
    if (username === "" || password === "") {
      alert("用户名或密码不能为空");
    } else {
      useApi
        .post("/login", {
          username,
          password,
        })
        .then((res) => {
          //  登录成功 存储 token 将状态设置为登录
          const token = res.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("login", "1");
          setIsLogin(true);
          setToken(token);
          setUserName(res.data.username);
          navigate("/", { replace: true });
          window.location.reload();
        })
        .catch(() => {
          alert("登录失败");
        });
      setUsername(() => "");
      setPassword(() => "");
    }
  };

  return (
    <div className=" flex">
      <div className=" w-2/5 flex-shrink-0 bg-sky-300 h-screen relative">
        <div className=" absolute right-0 w-52 h-52 bg-sky-400 rounded-l-xl top-1/3 shadow-lg">
          <img src="/home.svg" alt="home-logo" className="" />
        </div>
      </div>
      <div className={" flex-1 bg-slate-100 relative"}>
        <div className=" absolute w-80 h-52 top-1/3 rounded-r-xl shadow-lg bg-white flex flex-col justify-center items-center">
          <div
            className={` p-3  border-2  rounded-md ${
              isFocus.username ? "border-sky-400" : "border-slate-300"
            }`}
          >
            <input
              type="text"
              placeholder="请输入用户名"
              className=" outline-none border-b-2 border-white focus:border-sky-400
                         "
              value={username}
              onChange={updateUsername}
              onFocus={userInputFocus}
              onBlur={userInputBlur}
            ></input>
          </div>
          <div
            className={` p-3  border-2  rounded-md ${
              isFocus.password ? "border-sky-400" : "border-slate-300"
            } mt-1`}
          >
            <input
              type="password"
              placeholder="请输入密码"
              className=" outline-none border-b-2 border-white focus:border-sky-400
                         "
              value={password}
              onChange={updatePassword}
              onFocus={passwordInputFocus}
              onBlur={passwordInputBlur}
            ></input>
          </div>
          <div className=" mt-2">
            <button
              className=" w-24 h-12 border-2 rounded shadow-md mr-3 hover:shadow-lg duration-75"
              onClick={register}
            >
              {" "}
              注册并登录{" "}
            </button>
            <button
              className=" w-24 h-12 border-2 border-sky-300 rounded 
                        shadow-md bg-sky-400 text-white hover:shadow-lg duration-75"
              onClick={login}
            >
              {" "}
              登录{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
