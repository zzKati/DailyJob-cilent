import { Outlet } from "react-router-dom";
import useUserStore from "../../store/UserStore";
import LeftNav from "./LeftNav";
import Loading from "../../components/Loading";
function Home() {
    const {isLogin} = useUserStore()
    return (isLogin?<div className=" flex">
    <LeftNav></LeftNav>
    <div className=" flex-1 bg-slate-100">
        <Outlet></Outlet>
    </div>
</div>:<Loading></Loading>);
}

export default Home;