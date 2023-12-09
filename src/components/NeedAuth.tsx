import useUserStore from "../store/UserStore"
import { useNavigate} from "react-router-dom";
import userApi from "../api/userApi"
import { useEffect} from "react";

function NeedAuth(props) {
    const { token,setToken,setIsLogin,setUsername} = useUserStore();
    const navigate = useNavigate();

    
    useEffect(() => {
        // 验证 token 是否存在
        if (!token) {
          // token不存在 跳转至登录页面
          navigate('/login', { replace: true });
        } else {
          //token 存在 验证token 是否正确
            userApi({
              url: '/autologin',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              method: 'post',
            }).then(res=>{
              if (res.data.message) {
                // 如果 token 有效
                setIsLogin(true);
                setUsername(res.data.username)
                localStorage.setItem('login','1')
              }
            }).catch(()=>{
              // 如果token 无效
              console.log('自动登录失败');
              setIsLogin(false);
              setToken(null);
              localStorage.setItem('login','0')
              navigate('/login')
            })
        }
    }, [navigate, setIsLogin, setToken, token]);


    return props.children


}

export default NeedAuth;