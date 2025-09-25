import httpInstance from '@/utils/http'
export function getCatergory(){
  return httpInstance({
    url:'home/category/head'
  })
}