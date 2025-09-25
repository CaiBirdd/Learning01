<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
const UserStore = useUserStore()
const router = useRouter()
const confirm = () => {
  console.log('确定退出登录')
  UserStore.clearUserInfo()
  router.push('/login')
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="UserStore.userInfo.token">
          <li><a href="javascript:;" @click="$router.push('/member')"><i class="iconfont icon-user"></i>{{ UserStore.userInfo.account }}</a></li>
          <li>
            <!-- @confirm是确认事件，@cancel是取消事件。 -->
            <el-popconfirm title="确认要退出吗？" confirm-button-text="确认" cancel-button-text="取消" @confirm="confirm">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;" @click="$router.push('/member/order')">我的订单</a></li>
          <li><a href="javascript:;" @click="$router.push('/member')">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>

  </nav>
</template>

<style scoped lang="scss">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center; // 在垂直方向居中，现在的主轴是水平的，交叉轴方向居中

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor; //给父元素a 或者说当前元素 加个悬停变色
        }
      }

      ~li {

        //给第一个li 的后面所有兄弟 li 里的 a 标签，加上左边框。
        a {
          border-left: 2px solid #666;
        }
      }
    }

  }
}
</style>