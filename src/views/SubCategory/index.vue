<script setup>
import { getCategoryFilterAPI, getGoodsListAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import GoodsItem from '../Home/components/GoodsItem.vue'

//面包屑导航
const route = useRoute()
const categoryFilterDate = ref({})
const getCategoryFilter = async (id) => {
  const res = await getCategoryFilterAPI(id)
  console.log(res)
  categoryFilterDate.value = res.result
}
onMounted(() => {
  getCategoryFilter(route.params.id)   //这是获取二级分类详情的id 点击时通过路由跳转传递过来的
})
//基础列表数据getGoodsListAPI 
const sendDate = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const goodsList = ref([])
const getGoodsList = async (obj) => {
  const res = await getGoodsListAPI(obj)
  console.log(res)
  goodsList.value = res.result.items
}
onMounted(() => {
  getGoodsList(sendDate.value)
})
//tab切换回调
//当Tabs 组件触发 tab-change 事件时，执行我定义的 tabChange 函数
const tabChange = () =>{ //应该是@tab-change="tabChange"会默认返回一个参数 也就是当前切换到哪个了
  console.log('tab切换了!!!',sendDate.value.sortField) 
  sendDate.value.page = 1 
  getGoodsList(sendDate.value)
  
}
//获取下一页数据
const disabled = ref(false)
const load = async () =>{
  sendDate.value.page++
  const res = await getGoodsListAPI(sendDate.value) //拿的是页数加一后 新一页的数据 比如第二页
  goodsList.value = [...goodsList.value,...res.result.items] //将原数据，和新拿到的一页数据拼接
  if (res.result.items.length === 0){
    disabled.value = true
  }

}

</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryFilterDate.parentId}` }">{{ categoryFilterDate.parentName
        }} </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryFilterDate.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="sendDate.sortField" @tab-change="tabChange">     <!-- tab这的v-mode和下面name中的内容、上面sendDate.sortField的内容双向绑定 ***其实不是赋值，而是 注册事件监听器：tab-change 事件发生时 → 调用 tabChange 这个函数。-->
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>   <!-- 下面这三个字段对应不同的axios请求 -->
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div v-infinite-scroll="load" class="body" :infinite-scroll-disabled="disabled">   <!-- 使用 elementPlus 提供的 v-infinite-scroll 指令监听是否满足触底条件 -->
        <!-- 商品列表-->
        <GoodsItem v-for="item in goodsList" :key="item.id" :i="item"></GoodsItem>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>
