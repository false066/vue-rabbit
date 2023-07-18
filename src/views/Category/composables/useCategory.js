// 封装分类数据业务的代码
import { getCategoryAPI } from '@/apis/category.js';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
  const route = useRoute()
  const categoryData = ref({})

  const getCategoryData = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    // console.log(res);
    categoryData.value = res.result
  }

  onMounted(() => {
    getCategoryData()
  })

  // 目标：路由参数变化的时候 可以把分类数据的接口重新发送
  onBeforeRouteUpdate((to) => {
    console.log('路由变化了');
    console.log(to);
    getCategoryData(to.params.id)
  })
  return{
    categoryData
  }

}

