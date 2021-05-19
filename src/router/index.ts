import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {getComponentByRootPath} from './util'

let getComponent;
//开发环境下不使用按需加载打包模式,提升打包速度
getComponent = getComponentByRootPath('');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect:'/main'
  },{
    path: '/main',
    name: 'Main',
    component: () => require("../layout/Main"),
    redirect:'/dashboard',
    children:[
      {
        path: '/dashboard',
        name: 'dashboard',
        component: getComponent('dashboard/Index')
      },{
        path: '/home',
        name: 'shouye',
        component: getComponent('home/Index')
      }
    ]
  },{
    path: '/login',
    name: 'Login',
    component: getComponent('login/Index')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
