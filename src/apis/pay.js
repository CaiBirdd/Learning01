//支付页面
import httpInstance from '@/utils/http'

//获取订单信息
export const getOrderAPI = (id)=> httpInstance.get(`/member/order/${id}`)