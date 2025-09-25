import ImageView from '@/components/ImageView/index.vue'
import XtxSku from '@/components/XtxSku/index.vue'
// 把components中的所组件都进行全局化注册
//因为components下的内容被经常复用吗
// 通过插件的方式


export const componentPlugin = {
  install(app){
    // app.component('组件名字'，组件配置对象)
    app.component('ImageView',ImageView)
    app.component('XtxSku',XtxSku)
  }
}