import Vue from 'vue'
import VueRouter from 'vue-router'

import RS_Prediction from '@/views/RS_Prediction'
import RS_Scenario from '@/views/RS_Scenario'
import RS_DangerousSite from '@/views/RS_DangerousSite'
import RS_SaleVoc from '@/views/RS_SaleVoc'
import RS_NetworkVoc from '@/views/RS_NetworkVoc'
import RS_Bonbu from '@/views/RS_Bonbu'
import RS_Product from '@/views/RS_Product'
import RS_JisaTv from '@/views/RS_JisaTv'
import RS_JisaWireless from '@/views/RS_JisaWireless'
import RS_JisaInternet from '@/views/RS_JisaInternet'
import Board from '@/components/board/Board'
import ContentDetail from '@/components/board/ContentDetail';
import Create from '@/components/board/Create';




Vue.use(VueRouter)



const routes=[
  {
    path:'/',
    name:'RS_Prediction',
    component:RS_Prediction
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
    name:'RS_Internet',
    component:RS_JisaInternet
  },
  {
    path:'/board/free',
    name:'Board',
    component:Board,
  },
  {
    path:'/board/free/detail/:contentId',
    name:'ContentDetail',
    component:ContentDetail,
  },
  {
    path:'/board/free/create/:contentId?',
    name:'Create',
    component:Create,
  },

]

const router=new VueRouter({
    mode:'history',
    routes
})

export default router
