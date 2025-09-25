import httpInstance from '@/utils/http'

export const getCategoryListAPI = (id)=> httpInstance.get('/category',{
  params:{   //请求上的参数 文档写的query 这就用params 注意和路由那边区分开
    id
  }
})

export const getCategoryFilterAPI = (id)=> httpInstance.get('/category/sub/filter',{
  params:{
    id
  }
})

export const getGoodsListAPI = (data) => httpInstance.post('/category/goods/temporary',data)
//post 这里有点区别 data这里本身就是一个对象 不能在{}套一层了
// axios.post(url, body) → 第二个参数就是请求体 和get有区别