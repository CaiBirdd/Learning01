//订单详情页
import httpInstance from '@/utils/http'

//获取订单详情
export const getCheckOutInfoAPI = ()=> httpInstance.get('/member/order/pre')

//提交订单
export const createOrderAPI = (data)=> httpInstance.post('/member/order',data)