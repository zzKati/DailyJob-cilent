import { NavLink } from "react-router-dom";
import useUserStore from "../../store/UserStore";

function LeftNav() {
  const { username } = useUserStore();

  return (
    <div className=" h-screen w-60 bg-sky-400 left-0">
      <div className=" p-3 flex">
        <div className=" w-12 h-12 bg-sky-500 rounded text-white flex justify-center items-center font-bold text-3xl">
          {username[0].toUpperCase()}
        </div>
        <div className=" h-6 p-3 text-white font-semibold text-xl leading-6">
          {username}
        </div>
      </div>
      <NavLink
        to="/message"
        className={({
          isActive,
        }) => ` block ml-2 p-2 text-white font-semibold w-11/12 rounded-md duration-75
    hover:bg-blue-500 ${isActive ? " bg-blue-600" : ""}`}
      >
        任务管理
      </NavLink>
      {/* <NavLink to='/todo' className={({isActive}) => ` block ml-2 p-2 text-white font-semibold w-11/12 rounded-md duration-75
    hover:bg-blue-500 ${isActive ? ' bg-blue-600':''}`}>待办清单</NavLink> */}
    </div>
  );
}

export default LeftNav;
