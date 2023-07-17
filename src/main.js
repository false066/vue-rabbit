
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useIntersectionObserver } from '@vueuse/core'
import App from './App.vue'
import router from './router'

// 引入初始化的文件
import '@/styles/common.scss'

// 测试接口函数
// import { getCategory } from '@/apis/testAPI'

// getCategory().then(res => {
//   console.log(res);
// })

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 定义全局组件
app.directive('img-lazy', {
  mounted(el, binding) {
    // el:指令绑定的那个元素 img 
    // binding: binding.value 指令等于号后面绑定的表达式的值 图片url
    console.log(el, binding.vaule);
    useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        console.log(isIntersecting);
        if (isIntersecting) {
          // 进入视口区域
          el.src = binding.value
        }
      },
    )
  }
});