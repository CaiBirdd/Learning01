import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue' //注意这是是起了个名字 引入 给组件起个别名
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import CheckOut from '@/views/CheckOut/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'

//只在一级路由开头前面加上/ 后面二级三级路由都不要加 子路由 path 不要写 /，写了就是绝对路径。
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:Layout,
      children:[
        {
          path:'',
          component:Home
        },
        {
          path:'category/:id',
          component:Category
        },
        {
          path:'category/sub/:id',
          component:SubCategory
        },
        {
          path:'detail/:id',
          component:Detail
        },
        {
          path:'cartlist',
          component:CartList
        },
        {
          path:'checkout',
          component:CheckOut
        },
        {
          path:'pay',
          component:Pay
        },
        {
          path:'paycallback',
          component:PayBack
        },
        {
          path:'member',
          component:Member,

          children:[
            {
              path:'', //进入个人中心页 默认显示
              component:UserInfo
            },
            {
              path:'order',
              component:UserOrder
            }
          ]
        }
      ]
    },
    {
      path:'/login',
      component:Login
    },
  ],
  //切换路由时滚到顶部
  scrollBehavior(){
    return {
      top:0
    }
  }
})

export default router
