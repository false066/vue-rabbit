// 封装购物车模块

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore.js';
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '../apis/cart.js'
export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  // 获取购物车最新列表
  const updateNewList = async() =>{
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }
  const isLogin = computed(() => userStore.userInfo.token)
  // 1. 定义state - cartList
  const cartList = ref([])
  // 2. 定义action - addCart
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      // 登陆之后的加入购物车逻辑
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
      // console.log('添加', goods)
      // 添加购物车操作
      // 已添加过 - count + 1
      // 没有添加过 - 直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        // 找到了
        item.count++
      } else {
        // 没找到
        cartList.value.push(goods)
      }
    }
  }

  // 删除购物车
  const delCart = async(skuId) => {
    if (isLogin.value) {
      // 调用接口实现接口购物车的删除功能
      await delCartAPI([skuId])
      updateNewList()
    }else{
      // console.log('11111111',skuId);
    // 思路:
    // 1.找到删除项的下标值 - splice
    // 2.使用数组的过滤方法 - filter
    // const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    // cartList.value.splice(idx,1)
    // const filterList = cartList.value.filter((item) => skuId === item.skuId)
    // const newList = cartList.value.filter((item) => !filterList.includes(item));
    // cartList.value = newList;
    cartList.value = cartList.value.filter((item) => skuId !== item.skuId)
    }
    

  }

  // 清除购物车
  const clearCart = () =>{
    cartList.value = []
  }

  // 单选框功能
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => skuId === item.skuId)
    item.selected = selected
  }

  // 全选功能
  const allCheck = (selected) => {
    // 把cartList中的每一项都设置为当前的全选状态
    cartList.value.forEach(item => item.selected = selected)
  }

  // 计算属性
  // 1.总的数量 所有项的count之和
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // 2.总价 所有项的count * price
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  // 是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected === true))

  // 3.已选择商品数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected === true).reduce((a, c) => a + c.count, 0))
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected === true).reduce((a, c) => a + c.count * c.price, 0))

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    clearCart,
    updateNewList
  }
}, {
  persist: true,
})