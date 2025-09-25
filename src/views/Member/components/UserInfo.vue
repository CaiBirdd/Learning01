<script setup>
import { useUserStore } from '@/stores/userStore'
import { getLikeListAPI } from '@/apis/user'
import { onMounted, ref } from 'vue'
import GoodsItem from '@/views/Home/components/GoodsItem.vue'
const UserStore = useUserStore()
const likeList = ref([])
const getLikeList = async (obj) => {
  const res = await getLikeListAPI(obj)
  likeList.value = res.result
  console.log(res)
  
}
onMounted(()=>{
  getLikeList({limit:4})
})
</script>

<template>
  <div class="home-overview">
    <!-- 用户信息 -->
    <div class="user-meta">
      <div class="avatar">
        <img :src="UserStore.userInfo?.avatar" />
      </div>
      <h4>{{ UserStore.userInfo?.account }}</h4>
    </div>
    <div class="item">
      <a href="javascript:;">
        <span class="iconfont icon-hy"></span>
        <p>会员中心</p>
      </a>
      <a href="javascript:;">
        <span class="iconfont icon-aq"></span>
        <p>安全设置</p>
      </a>
      <a href="javascript:;">
        <span class="iconfont icon-dw"></span>
        <p>地址管理</p>
      </a>
    </div>
  </div>
  <div class="like-container">
    <div class="home-panel">
      <div class="header">
        <h4 data-v-bcb266e0="">猜你喜欢</h4>
      </div>
      <div class="goods-list">
        <GoodsItem v-for="item in likeList" :key="item.id" :i="item" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-overview {
  height: 132px;
  background: url(@/assets/images/center-bg.png) no-repeat center / cover;  // 背景图：不重复，居中显示，cover 表示等比放大填满区域
  display: flex;

  .user-meta {
    flex: 1; // 占据一半宽度
    display: flex;
    align-items: center;

    .avatar {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 60px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    h4 {
      padding-left: 26px;
      font-size: 18px;
      font-weight: normal;
      color: white;
    }
  }

  .item {
    flex: 1; // 占据另一半宽度
    display: flex;
    align-items: center;
    justify-content: space-around;

    &:first-child {
      border-right: 1px solid #f4f4f4;
    }

    a {
      color: white;
      font-size: 16px;
      text-align: center;

      .iconfont {
        font-size: 32px;
      }

      p {
        line-height: 32px;
      }
    }
  }
}

.like-container {
  margin-top: 20px;
  border-radius: 4px;
  background-color: #fff;
}

.home-panel {
  background-color: #fff;
  padding: 0 20px;
  margin-top: 20px;
  height: 400px;

  .header {
    height: 66px;
    border-bottom: 1px solid #f5f5f5;
    padding: 18px 0;
    display: flex;
    justify-content: space-between; // 左右分布（标题在左，右边可放按钮）
    align-items: baseline; // 垂直对齐到基线（标题文字更自然）

    h4 {
      font-size: 22px;
      font-weight: 400;
    }

  }

  .goods-list { // 商品列表容器
    display: flex;  // Flex 水平排列商品
    justify-content: space-around; // 每个商品在容器中均匀分布
  }
}
</style>
