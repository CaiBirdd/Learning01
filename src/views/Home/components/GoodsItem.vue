<script setup>
defineProps({
  i: {
    type: Object,
    default: () => { } //看请求回来的数据，数组包对象，i是一个对象
  }
})
</script>

<template>

  <RouterLink :to="`/detail/${i.id}`" class="goods-item">
    <img :src="i.picture" alt="" />
    <p class="name ellipsis">{{ i.name }}</p>
    <p class="desc ellipsis">{{ i.desc }}</p>
    <p class="price">&yen;{{ i.price }}</p>
  </RouterLink>

</template>
<style scoped lang="scss">
.goods-item {
  //.goods-item 实际上是一个 <RouterLink> 标签（本质就是一个  <a> 链接） 默认情况下，<a> 是 行内元素（inline）所以无法设置宽和高
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  transition: all .5s;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

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
</style>