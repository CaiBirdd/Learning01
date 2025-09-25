//用户的都在这 首先是登录
import httpInstance from '@/utils/http'

//登录 名字和值一样。可以只简写名字
export const loginAPI = ({account , password}) => httpInstance.post('/login',
  {
    account,
    password
  }
)

//个人中心获取猜你喜欢
export const getLikeListAPI = ({limit = 4}) => httpInstance.get('/goods/relevant',{
  params:{
    limit
  }
})