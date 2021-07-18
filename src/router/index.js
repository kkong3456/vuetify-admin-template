import Vue from 'vue'
import VueRouter from 'vue-router'

// import RS_Prediction from '@/views/RS_Prediction'
import RS_Dashboard from '@/views/RS_Dashboard'
import RS_Scenario from '@/views/RS_Scenario'
import RS_DangerousSite from '@/views/RS_DangerousSite'
import RS_RsDayTimeLocationsMap from '@/views/RS_RsDayTimeLocationsMap'
import RS_RsNightTimeLocationsMap from '@/views/RS_RsNightTimeLocationsMap'

import RS_SaleVocProduct from '@/views/RS_SaleVocProduct'
import RS_SaleVocWork from '@/views/RS_SaleVocWork'
import RS_NetworkVocProduct from '@/views/RS_NetworkVocProduct'
import RS_NetworkVocWork from'@/views/RS_NetworkVocWork'

import RS_Bonbu from '@/views/RS_Bonbu'
import RS_Product from '@/views/RS_Product'
import RS_JisaTv from '@/views/RS_JisaTv'
import RS_JisaWireless from '@/views/RS_JisaWireless'
import RS_JisaInternet from '@/views/RS_JisaInternet'
import RS_HjTable from '@/views/RS_HjTable'
import SignIn from '@/views/authentication/Signin'
import SignUp from '@/views/authentication/Signup'
import ProductList from '@/views/page/ProductList'

import DefaultLayout from '@/layouts/default/index'
import PageLayout from '@/layouts/page/index'
import AuthenticationLayout from '@/layouts/authentication/index'

import RSN_HjVoc from '@/views/RSN_HjVoc'
import RSN_PjVoc from '@/views/RSN_PjVoc'



Vue.use(VueRouter)



const routes=[
  {
    path:'/',
    component:DefaultLayout,
    children:[
      {
        // path:'/',
        // name:'RS_Dashboard',
        // component:RS_Dashboard
        path:'/',
        name:'RS_JisaTv',
        component:RS_JisaTv
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
      {
        path:'/scenario',
        name:'RS_Scenario',
        component:RS_Scenario
      },
      {
        path:'/dangeroussite',
        name:'RS_DangerousSite',
        component:RS_DangerousSite
      },
      {
        path:'/rs-daytime-locations',
        name:'RS_RsDayTimeLocationsMap',
        component:RS_RsDayTimeLocationsMap,
      },
      {
        path:'/rs-nighttime-locations',
        name:'RS_RsNightTimeLocationsMap',
        component:RS_RsNightTimeLocationsMap,
      },

      {
        path:'/sale-voc-product',
        name:'RS_SaleVocProduct',
        component:RS_SaleVocProduct
      },
      {
        path:'/sale-voc-work',
        name:'RS_SaleVocWork',
        component:RS_SaleVocWork
      },

      {
        path:'/network-voc-product',
        name:'RS_NetworkVocProduct',
        component:RS_NetworkVocProduct
      },

      {
        path:'/network-voc-work',
        name:'RS_NetworkVocWork',
        component:RS_NetworkVocWork,
      },

      {
        path:'/bonbu',
        name:'RS_Bonbu',
        component:RS_Bonbu
      },

      {
        path:'/product',
        name:'RS_Product',
        component:RS_Product
      },
      {
        path:'/jisa-tv',
        name:'RS_JisaTv',
        component:RS_JisaTv
      },
      {
        path:'/jisa-wireless',
        name:'RS_JisaWireless',
        component:RS_JisaWireless
      },
      {
        path:'/jisa-internet',
        name:'RS_JisaInternet',
        component:RS_JisaInternet
      },
      {
        path:'/hj-table',
        name:'RS_HjTable',
        component:RS_HjTable
      }
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
