import Layout from '@/layout/index.vue'

/**
@params
* hidden 客户端本地隐藏
* hiddenCode 服务端隐藏
*/
// 动态权限路由
const asyncRoutes = [
  // TODO 模块一
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'nested',
    alwaysShow: true,
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index.vue'), // Parent router-view
        name: 'menu1',
        meta: { title: 'Menu1', hiddenCode: 'Menu1', iconUrl: require('@/assets/images/reviews.png') },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
            name: 'menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
            name: 'menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                name: 'menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                name: 'menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
            name: 'menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index.vue'),
        name: 'menu2',
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    redirect: '/about',
    name: 'about',
    alwaysShow: true,
    meta: {
      title: 'About'
    },
    children: [
      {
        path: 'about1',
        component: () => import('@/views/nested/menu1/index.vue'), // Parent router-view
        name: 'about1',
        meta: { title: 'About1' }
      },
      {
        path: 'about2',
        component: () => import('@/views/nested/menu1/index.vue'), // Parent router-view
        name: 'about2',
        meta: { title: 'About2' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  // using pathMatch install of "*" in vue-router 4.0
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]

export default asyncRoutes
