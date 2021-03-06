import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL: 'http://localhost:5300/api/admin'
})

http.interceptors.request.use(config=>{
    if(sessionStorage.token){
        config.headers.Authoriztion = 'Bearer ' + (sessionStorage.token||' ')
    }
    return config
}, err=>Promise.reject(err))


http.interceptors.response.use(res => {
    return res
}, err => {
    Vue.prototype.$message({
        type:'error',
        message: err.response.data.message
    })
    if(err.response.status === 401){
        router.push('/login')
    }
    return Promise.reject(err);
})

export default http