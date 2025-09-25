<script setup>
import { getHotListAPI } from '@/apis/detail'
import { ref,onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
const props = defineProps({
  hotType:{
    type:Number
  }
})
const titleClass = {
  1: '24小时热榜',
  2: '周热榜',
}
const title = computed(()=>{
  return titleClass[props.hotType]    //这里是对象属性访问的一种方式。 键名 键值
})
//和下面种种方法等价
// if (props.hotType === 1) return '24小时热榜'
// if (props.hotType === 2) return '周热榜'


const hotList = ref([])
const route = useRoute()
const getHotList = async(obj) =>{
  const res = await getHotListAPI(obj)
  console.log(res)
  hotList.value = res.result
  
}
onMounted(()=>{
  getHotList({
    id:route.params.id,
    type:props.hotType
  })
})
</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink v-for="item in hotList" :key="item.id" :to="`/detail/${item.id}`" class="goods-item">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}/p>
      </p><p class="price">&yen;{{ item.price }}0</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
  .goods-hot {
    h3 {
      height: 70px;
      background: $helpColor;
      color: #fff;
      font-size: 18px;
      line-height: 70px;
      padding-left: 25px;
      margin-bottom: 10px;
      font-weight: normal;
    }

    .goods-item {
      display: block;
      padding: 20px 30px;
      text-align: center;
      background: #fff;
      width: 280px;

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
  }
</style>
