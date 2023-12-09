// import {useEffect} from 'react'
import { Navigate } from "react-router-dom";
function Cantshow(props) {
  // 此组件用于登陆后不能跳转至 login 页面

  // const navigate = useNavigate()

  const login = localStorage.getItem("login");
  if (login) {
    return login === "0" ? props.children : <Navigate to="/"></Navigate>;
  }
  return props.children;
}

export default Cantshow;
