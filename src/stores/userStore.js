//管理用户数据
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

export const useUserStore = defineStore('user', () => {
  //定义用户数据
  const CartStore = useCartStore()
  const userInfo = ref({})
  //定义获取用户数据的action函数 这部分同登录 登录的时候就已经拿到用户数据了
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    //登录时进行购物车合并操作 本地和账号的合并
    await mergeCartAPI(CartStore.cartList.map((item)=> {
      return {
        skuId:item.skuId,
        selected:item.selected,
        count:item.count
      }
    }))
    //合并完拉一下最新的购物车
    CartStore.updateCartList()
  }
  //退出时清除数据 清除个人信息和购物车数据 持久化插件会同步local里的数据一块清空
  const clearUserInfo = () =>{
    userInfo.value = {}
    CartStore.clearCart()
  }
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, 
{
  persist: true
})