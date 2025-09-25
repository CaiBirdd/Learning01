//倒计时函数

import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'
export const useCountDown = () => {
  let timer = null
  const time = ref(0)
  const start = (currentTime) => {
    time.value = currentTime
    timer = setInterval(()=>{
      time.value--
    },1000)
  }
  //上面就是正常传值减减操作 但是在返回时 对时间进行一下处理
  //对时间进行格式化 注意computed返回的是响应式对象
  const formatTime = computed(()=>dayjs.unix(time.value).format('mm分:ss秒') )
  //组件销毁时清除定时器
  onUnmounted(()=>{
    if(timer){
      clearInterval(timer)
    }
  })
  return {
    formatTime,
    start
  }

}