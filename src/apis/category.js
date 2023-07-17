import httpInstance from "@/utils/http";


// 获取category
export function getCategoryAPI(id){
  return httpInstance({
    url: '/category',
    params:{
      id,
    }
  })
}