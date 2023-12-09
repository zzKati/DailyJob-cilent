import axios from 'axios'

const userApi = axios.create({
    baseURL:'http://127.0.0.1:3000/user'
})


export default userApi