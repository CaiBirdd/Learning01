import { useIntersectionObserver } from '@vueuse/core'
//这是 VueUse 提供的一个封装函数，其实内部是基于 原生的 IntersectionObserver API。
//作用：检测某个元素是否进入了可视区域。

export const LazyPlugin = {
  install(app){

    app.directive('img-lazy',{
      mounted(el,binding){
        // el: 指令绑定的那个元素 img
        // binding: binding.value  指令等于号后面绑定的表达式的值  图片url
        console.log(el,binding.value)
        const {stop} = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => { //检测到图片进入视口：isIntersecting === true
            console.log(isIntersecting)
            if(isIntersecting){
              //进入视口区域
              el.src = binding.value   //赋值 src：这时才把真实图片地址赋给 <img> 的 src 属性
              stop()       //停止观察：stop() 停止监听，避免重复触发，提高性能
            }
          },
        )
    
      }
    })
    
  }
    
}