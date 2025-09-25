import { getBannerAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'


export const useBanner = () =>{
  //banner 改了一下传参 在函数调用里传的，然后函数里面用形参
  const bannerList = ref([])
  const getBanner = async (obj) => {
    const res = await getBannerAPI(obj)
    //console.log(res)
    bannerList.value = res.result
  }
  onMounted(() => {
    getBanner({
      distributionSite: '2'
    })
  })
  return{
    bannerList
  }

}