import httpInstance from '@/utils/http'
//首页banner和分类页下的banner 二合一
//两行了 别忘了return
//params = {} 只是设了个默认初始值 为空
//const {distributionSite = '1'} = params是默认为1渲染首页 当传入其他会覆盖 用新的
export const getBannerAPI = (params = {}) => 
{
  const {distributionSite = '1'} = params
  return httpInstance.get('/home/banner',{
    params:{
      distributionSite
    }
  })
}

//新鲜好物
export const findNewAPI = () => httpInstance.get('/home/new')
//人气推荐
export const findHotAPI = () => httpInstance.get('/home/hot')
//pproduct产品列表
export const getProductAPI = () => httpInstance.get('/home/goods')