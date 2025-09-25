<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from '@/views/Layout/components/LayoutFixed.vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { onMounted } from 'vue'

const useCategory = useCategoryStore()

onMounted(()=>{
  useCategory.getCategory()
})

</script>


<template>
  
  <div>
  
  
    <LayoutFixed></LayoutFixed>
    <LayoutNav></LayoutNav>
    <LayoutHeader></LayoutHeader>


    <!-- 二级路由出口 -->
    <RouterView></RouterView>

  

    <LayoutFooter></LayoutFooter>
  </div>
</template>