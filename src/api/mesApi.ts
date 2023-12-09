import axios from "axios";
// import useUserStore from "../store/UserStore";

const token = localStorage.getItem("token");
// const { token } = useUserStore.getState();
const mesApi = axios.create({
  baseURL: "http://127.0.0.1:3000/mes",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default mesApi;
