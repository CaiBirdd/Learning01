//这里是购物车的api 分为传购物车数据 和 拿到新的购物车列表

import httpInstance from '@/utils/http'


//加入购物车
export const insertCartAPI = ( {skuId,count} ) => httpInstance.post('/member/cart',{
  skuId,
  count
})

//获取购物车
export const getNewCartListAPI = ()=> httpInstance.get('/member/cart')


//删除购物车
// axios.delete(url, { data }) 必须写成这样，data 需要放到第二个参数的对象里（不像 post、put 直接传 data 就行）
// 否则默认会把参数当成 config，请求体发不出去。
export const delCartAPI = (ids)=> httpInstance.delete('/member/cart',{
  data:{
    ids
  }
})

//登录时合并购物车 data是一个数组
export const mergeCartAPI = (data)=> httpInstance.post('/member/cart/merge',data)