import Vue from 'vue'
import VueRouter from 'vue-router'

// import RS_Prediction from '@/views/RS_Prediction'
import RS_Dashboard from '@/views/RS_Dashboard'
import RS_Scenario from '@/views/RS_Scenario'
import RS_DangerousSite from '@/views/RS_DangerousSite'
import RS_SaleVoc from '@/views/RS_SaleVoc'
import RS_NetworkVoc from '@/views/RS_NetworkVoc'
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
        path:'/sale-voc',
        name:'RS_SaleVoc',
        component:RS_SaleVoc
      },

      {
        path:'/network-voc',
        name:'RS_NetworkVoc',
        component:RS_NetworkVoc
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
