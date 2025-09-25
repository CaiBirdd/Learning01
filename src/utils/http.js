import axios from 'axios'
import { ElMessage } from 'element-plus'  //element的提示
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'
//import { useRouter } from 'vue-router' 不是vue setup里用不了好像
//必须在组件的 setup 上下文中调用，不能在普通的 JS 文件或 setup 之外直接调用
const httpInstance = axios.create({
  baseURL:'https://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout:50000
})
//拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  const UserStore = useUserStore()
  const token = UserStore.userInfo.token
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  ElMessage({
    type:'warning',
    message:e.response.data.message
  })
  //token过期后报401的处理 可以在local里改token模拟
  if(e.response.status === 401 ){
    //清除个人信息
    const UserStore = useUserStore()
    // const router = useRouter()
    UserStore.clearUserInfo()
    //跳转登录页面
    router.push('/login')
  }
  return Promise.reject(e)
})
// 这里的 e 就是请求失败时 axios 捕获到的错误对象 error，其中：
//e.response 表示服务端返回的完整响应对象（status、headers、data 等）
//e.response.data 就是服务端返回的具体数据，一般是 JSON。
//e.response.data.message 取的就是 JSON 里 message 字段。


export default httpInstance
