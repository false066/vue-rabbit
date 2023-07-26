// 管理用户相关数据

import { defineStore } from 'pinia'
import { ref} from 'vue'
import { loginAPI } from '@/apis/user.js'
import { useCartStore } from './cartStore.js'
import { mergeCartAPI} from '@/apis/cart.js'
export const useUserStore = defineStore('user',() => {
  const cartStore = useCartStore()
  // 1.定义用户管理的state
  const userInfo = ref({})
  // 2.定义用于接受用户数据的action
  const getUserInfo = async({ account, password })=>{
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    // 合并购物车
    mergeCartAPI(cartStore.cartList.map(item =>{
      return{
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateNewList()
  }

  // 退出时清除用户信息
  
  const clearUserInfo = ()=>{
    userInfo.value = {}
    cartStore.clearCart()
  }
  // 3.以对象的方式把state，action return
  return{
    userInfo,
    getUserInfo,
    clearUserInfo
  }
},{
  persist: true
})