//个人信息页面的用户订单信息
import httpInstance from '@/utils/http'

/*
params: {
	orderState:0, tab切换时状态
  page:1, 哪页
  pageSize:2 每页的条数
}
*/
export const getUserOrderAPI = (params) => httpInstance.get('/member/order',params)