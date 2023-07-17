import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app) {
    // 定义全局组件
    const { stop } =app.directive('img-lazy', {
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
              stop()
            }
          },
        )
      }
    });
  }
};