//购物车模块
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { insertCartAPI, getNewCartListAPI,delCartAPI } from '@/apis/cart'
import { useUserStore } from './userStore'    //获取个人信息的token

export const useCartStore = defineStore('cart', () => {

  //定义state 购物车数据 数组包对象
  const cartList = ref([])
  //这里额外插入一个刷新购物车数据的方法
  const updateCartList = async() =>{
    const res = await getNewCartListAPI()
    cartList.value = res.result
  }
  //定义方法 改变数据
  const UserStore = useUserStore()
  const isLogin = computed(()=> UserStore.userInfo.token) //  这里不能直接写 需要computed包裹一下 才是响应式的对象！
  const addCart = async (obj) => {    //这个obj是在Detail下的index.vue中传过来的商品对象
    if (isLogin.value) {
      //是登录的 做登录后的加入购物车操作
      await insertCartAPI(obj)
      //加入完成后刷新
      updateCartList()
    } else {
      //否则本地购物车操作，原来写的
      //商品添加过 count+1
      //遍历购物车数组，查找 item是 cartList数组中的每一个对象
      //如果传入对象的obj.skuId 和 原购物车中的每一项的item.skuId 相等 那就返回相等的那个对象
      const item = cartList.value.find((item) => obj.skuId === item.skuId)
      if (item) {
        //找到了 原来有
        item.count++
      } else {
        //没添加过 把这个商品对象push进来
        cartList.value.push(obj)
      }
    }
  }
  //以下内容为购物车弹出层中的
  //定义方法 删除购物车内容
  //购物车写了个bug 没返回return 导致删除不对 教程没写{} 在一行 默认返回的 其他地方也没问题 就这换了个行 忘了return了！！！！！！
  const delCart = async (skuId) => {
    if(isLogin.value){
      //登录后的删除操作
      await delCartAPI([skuId])
      //删除完成后刷新
      updateCartList()
    }else{
      //通过数组方法  找到下标
    //比较数组中现存的skuId和传入的形参skuId 相等的话 则将其下标赋值给index
      const index = cartList.value.findIndex((item) => {
        return skuId === item.skuId
      })
      //splice方法删除
      cartList.value.splice(index, 1)
    }
  }
  //计算属性不用getters在vue3 
  //数量
  const allCount = computed(() => cartList.value.reduce((sum, item) => sum + item.count, 0))
  //总价
  const allPrice = computed(() => cartList.value.reduce((sum, item) => sum + item.count * item.price, 0))




  //以下内容为购物车列表页面中的
  //购物车单选
  const singleCheck = (skuId, selected) => {
    // 通过skuId找到要修改的商品然后把它的selected修改为传过来的selected
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }
  //购物车全选 单选=>全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))
  //购物车全选 全选=>单选
  //forEach() 方法的主要作用是遍历数组，对每个元素执行指定的回调函数，但它不会返回任何有意义的值
  const allCheck = (selected) => {
    cartList.value.forEach((item) => item.selected = selected)
  }

  //购物车统计 
  //选中商品的个数 filter返回一个数组 直接累加了.reduce别忘了也写在计算属性里面
  const selectedCount = computed(() => cartList.value.filter((item) => item.selected).reduce((sum, item) => sum + item.count, 0))
  //选中商品价格
  const selectedPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((sum, item) => sum + item.count * item.price, 0))
  //退出登录时清除购物车信息的方法
  const clearCart = ()=> {
    cartList.value = []
  }
  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    clearCart,
    updateCartList,
    isLogin
  }
},
{
  persist: true
})