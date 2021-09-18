import Vue from 'vue'
import VueRouter from 'vue-router'


import RSN_DayTimeLocationsMap from '@/views/RSN_DayTimeLocationsMap'

import SignIn from '@/views/authentication/Signin'
import SignUp from '@/views/authentication/Signup'
import ProductList from '@/views/page/ProductList'

import DefaultLayout from '@/layouts/default/index'
import PageLayout from '@/layouts/page/index'
import AuthenticationLayout from '@/layouts/authentication/index'

import RSN_DashBoard from '@/views/RSN_DashBoard'
import RSN_BonbuSalesPerf from '@/views/RSN_BonbuSalesPerf'
import RSN_JisaSalesPerf from '@/views/RSN_JisaSalesPerf'
import RSN_HjVoc from '@/views/RSN_HjVoc'
import RSN_PjVoc from '@/views/RSN_PjVoc'



Vue.use(VueRouter)



const routes=[
  {
    path:'/',
    component:DefaultLayout,
    children:[
      {
        path:'/',
        name:'RSN_DashBoard',
        component:RSN_DashBoard
      },
      {
        path:'/rsn-bonbu-sales-perf',
        name:'RSN_BonbuSalesPerf',
        component:RSN_BonbuSalesPerf,
      },
      {
        path:'/rsn-jisa-sales-perf',
        name:'RSN_JisaSalesPerf',
        component:RSN_JisaSalesPerf,
      },
      
      {
        path:'/rsn-daytime-locations',
        name:'RSN_DayTimeLocationsMap',
        component:RSN_DayTimeLocationsMap,
      },
   
      {
        path:'/rsn-hj-voc',
        name:'RSN_HjVoc',
        component:RSN_HjVoc,
      },
      {
        path:'/rsn-pj-voc',
        name:'RSN_PjVoc',
        component:RSN_PjVoc,
      },
     
    ]
  },
  {
    path:'/authentication',
    component:AuthenticationLayout,
    children:[
      {
        path:'sign-in',
        name:'SignIn',
        component:SignIn,
      },
      {
        path:'sign-up',
        name:'SignUp',
        component:SignUp,
      }
    ]
  },
  {
    path:'/page',
    component:PageLayout,
    children:[
      {
        path:'product-list',
        name:'ProductList',
        component:ProductList,

      },
    ]
  }
]

const router=new VueRouter({
  mode:'history',
  routes
})

export default router
