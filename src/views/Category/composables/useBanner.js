// 封装Banner轮播图相关业务的代码
import { getBannerAPI } from '@/apis/home'
import { ref, onMounted } from 'vue'

export function useBanner() {
  const bannerList = ref([])

  const getBannerList = async () => {
    const res = await getBannerAPI(
      { distributionSite: '2' }
    )
    // console.log(res);
    bannerList.value = res.result
    // console.log(bannerList.value);
  }

  onMounted(() => {
      getBannerList()
  })
  return{
    bannerList
  }
}