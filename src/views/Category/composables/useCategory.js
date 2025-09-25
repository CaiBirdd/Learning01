import { getCategoryListAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

export const useCategory = () => {
  //面包屑
  const route = useRoute()
  const categoryList = ref({})
  const getCategoryList = async (id = route.params.id) => {  //给形参设置默认参数，日过没有传进来数据默认就是路由跳转拿到的id
    const res = await getCategoryListAPI(id)
    console.log(res)
    categoryList.value = res.result
  }

  onMounted(() => {
    getCategoryList()
  })

  //目标：路由参数变化的时候可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    console.log('路由发生变化')
    //route.params.id 存在滞后性，无法及时获取路由参数
    //通过参数to目标路由对象获取路由参数
    getCategoryList(to.params.id)
  })
  return{
    categoryList
  }
}