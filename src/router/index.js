import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import Login from '@/views/Login/index.vue'
import SubCategory from '@/views/subCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import CheckOut from '@/views/CheckOut/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/payBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'category/:id',
          name: 'category',
          component: Category
        },
        {
          path: 'category/sub/:id',
          name: 'subcategory',
          component: SubCategory
        },
        {
          path:'detail/:id',
          name:'detail',
          component:Detail
        },
        {
          path:'cartlist',
          name:'cartlist',
          component:CartList
        },
        {
          path:'checkout',
          name:'checkout',
          component:CheckOut
        },
        {
          path:'pay',
          name:'pay',
          component:Pay
        },
        {
          path: 'paycallback', // 注意路径，必须是paycallback
          component: PayBack
        },
        {
          path: 'member', // 注意路径，必须是paycallback
          component: Member,
          children:[
            {
              path:'user',
              component:UserInfo
            },
            {
              path:'order',
              component:UserOrder
            }
          ]
        },
        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

  ],
  // 路由滚动行为定制
  scrollBehavior(){
    return{
      top:0
    }
  }
})

export default router