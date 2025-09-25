<script setup>
import { useCartStore } from '@/stores/cartStore'
//import { onMounted } from 'vue'
const CartStore = useCartStore()

//下一节视频day6 p8有合并操作 那里刷新 这里写早了哈哈哈 注释掉吧
// onMounted(()=>{
//   //登录成功后拿一下购物车数据 要不然只有通过加入购物车才能触发了 自己写的 不知道会不会有bug
//   if(CartStore.isLogin){   //这里不用加value
//     CartStore.updateCartList()
//   }
// })
</script>

<template>
  <div class="cart">
    <a class="curr" href="javascript:;">
      <i class="iconfont icon-cart"></i><em>{{ CartStore.cartList.length }}</em>
    </a>
    <div class="layer">
      <div class="list">

        <div v-for="i in CartStore.cartList" :key="i" class="item">
          <RouterLink to="">
            <img :src="i.picture" alt="" />
            <div class="center">
              <p class="name ellipsis-2">
                {{ i.name }}
              </p>
              <p class="attr ellipsis">{{ i.attrsText }}</p>
            </div>
            <div class="right">
              <p class="price">&yen;{{ i.price }}</p>
              <p class="count">x{{ i.count }}</p>
            </div>
          </RouterLink>
          <i class="iconfont icon-close-new" @click="CartStore.delCart(i.skuId)"></i>
        </div>

      </div>
      <div class="foot">
        <div class="total">
          <p>共 {{ CartStore.allCount }} 件商品</p>
          <p>&yen; {{ CartStore.allPrice.toFixed(2) }} </p>
        </div>
        <el-button size="large" type="primary" @click="$router.push('/cartlist')">去购物车结算</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cart {
  width: 50px;
  position: relative;
  z-index: 600;

  .curr {
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: relative;
    display: block;

    .icon-cart {
      font-size: 22px;
    }

    em {
      font-style: normal;
      position: absolute;
      right: 0;
      top: 0;
      padding: 1px 6px;
      line-height: 1;
      background: $helpColor;
      color: #fff;
      font-size: 12px;
      border-radius: 10px;
      font-family: Arial;
    }
  }

  &:hover {
    .layer {
      opacity: 1;
      transform: none;
    }
  }

  //初始：opacity: 0 + translateY(-200px) + scaleY(0)（看不见并且在上方）
  //悬停时：opacity: 1; transform: none（none 等于 identity transform，即 translateY(0) scale(1,1)）
  //由于 transition 定义，opacity & transform 会在延迟 0.2s 后动画至目标状态。
  .layer {
    opacity: 0;
    transition: all 0.4s 0.2s;
    transform: translateY(-200px) scale(1, 0);
    width: 400px;
    height: 400px;
    position: absolute;
    top: 50px;
    right: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 4px;
    padding-top: 10px;

    &::before {
      //伪元素 小三角 用正方形做三角
      content: "";
      position: absolute;
      right: 14px;
      top: -10px;
      width: 20px;
      height: 20px;
      background: #fff;
      transform: scale(0.6, 1) rotate(45deg);
      box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);   //box-shadow: offset-x offset-y blur-radius color;  阴影向左 3px 偏移、阴影向上 3px 偏移、模糊半径 5px，边缘虚化 半透明黑色（10% 透明度）
    }

    .foot {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 70px;
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background: #f8f8f8;
      align-items: center;

      .total {
        padding-left: 10px;
        color: #999;

        p {
          &:last-child {
            font-size: 18px;
            color: $priceColor;
          }
        }
      }
    }
  }

  .list {
    height: 310px;
    overflow: auto;
    padding: 0 10px;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #f8f8f8;
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: #eee;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }

    .item {
      border-bottom: 1px solid #f5f5f5;
      padding: 10px 0;
      position: relative;

      i {
        position: absolute;
        bottom: 38px;
        right: 0;
        opacity: 0;
        color: #666;
        transition: all 0.5s;
      }

      &:hover {
        i {
          opacity: 1;
          cursor: pointer;
        }
      }

      a {
        display: flex;
        align-items: center;

        img {
          height: 80px;
          width: 80px;
        }

        .center {
          padding: 0 10px;
          width: 200px;

          .name {
            font-size: 16px;
          }

          .attr {
            color: #999;
            padding-top: 5px;
          }
        }

        .right {
          width: 100px;
          padding-right: 20px;
          text-align: center;

          .price {
            font-size: 16px;
            color: $priceColor;
          }

          .count {
            color: #999;
            margin-top: 5px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
