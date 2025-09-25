import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

//在LayoutHeader LayoutFixed HomeCategory 和Layout文件夹下的index中 都用到了这个获取分类
//在Layout文件夹下的index中 调用 获取方法 减少重复获取
export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([])
  const getCategory = async () =>{
    const res = await getCategoryAPI()
    categoryList.value = res.result
  }
  return {
    categoryList,
    getCategory
  }
})
