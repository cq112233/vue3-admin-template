
/**
@desription 路由对象
@declare {
  hidden:true // 标识需要meun隐藏 一般是登入，注册，404，401 无meun 的一级路由  // 客户端进行隐藏控制
  meta:{
    title:'xx' 菜单 1.显示在浏览器title. 2.meun菜单标题，
    affix:true 固定tagView
    hiddenCode:"xxx" 服务端进行隐藏控制
    keepAlive:true, 会缓存带name的组件
    leaveRmKeepAlivee:true, 在进入新页面之前,会被清除
    elIcon: element-plus icon名字
    svgIcon: svg名字
    imgIcon: require('xxx') 图片路径
  }
}
*/
import { createRouter, createWebHashHistory } from 'vue-router'
import './asyncRoutes'
import Layout from '@/layout/index.vue'

// 公用路由
export const constantRoutes = [
  // 重定向
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '首页',
          svgIcon: 'password',
          elIcon: 'Fold',
          keepAlive: true,
          leaveRmKeepAlivee: false,
          affix: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
