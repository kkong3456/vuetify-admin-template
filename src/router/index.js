import Vue from 'vue'
import VueRouter from 'vue-router'

import RS_Prediction from '@/views/RS_Prediction'
import RS_Scenario from '@/views/RS_Scenario'
//import Dashboard from '@/views/Dashboard'
//import GridSystem from '@/views/GridSystem'
//import GridListPage from '@/views/GridListPage'
///import Breakpoints from '@/views/Breakpoints'
//import Typography from '@/views/Typography'
//import TableMenu from '@/views/TableMenu'
//import FormMenu from '@/views/FormMenu'
//import ButtonMenu from '@/views/ButtonMenu'
//import IconMenu from '@/views/IconMenu'
//import Line from '@/views/Line.vue'

Vue.use(VueRouter)

dd

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
  }
  /*
    {
        path:'/',
        name:'Dashboard',
        component:Dashboard
    },
    {
        path:'/grid-system',
        name:'GridSystem',
        component:GridSystem
    },
    {
      path:'/grid-list-page',
      name:'GridListPage',
      component:GridListPage,
    },
    {
      path:'/break-points',
      name:'Breakpoints',
      component:Breakpoints
    },
    {
      path:'/typo-graphy',
      name:'Typography',
      component:Typography
    },
    {
      path:'/tables',
      name:'TableMenu',
      component:TableMenu
    },
    {
      path:'/forms',
      name:'FormMenu',
      component:FormMenu
    }, 
    {
      path:'/buttons',
      name:'ButtonMenu',
      component:ButtonMenu
    },
    {
      path:'/icons',
      name:'IconMenu',
      component:IconMenu
    },

    {
      path:'/line',
      name:'Line',
      component:Line
    },
    */

]

const router=new VueRouter({
    mode:'history',
    routes
})

export default router
