import { DETAIL } from '@/constants'

/**
 * 研学活动管理
 * @module router/modules/basicData
 * @type {import('vue-router').RouteConfig[]}
 */
const routes = [
  {
    path: '/yanxue', // 只是为了拿到 layout 组件而占位的路由路径
    name: 'Yanxue',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '研学活动管理'
    },
    redirect: '/yanxue/outGroup/index.vue',
    children: [
      {
        path: `/outGroupDetail`,
        component: () => import('@/views/yanxue/outGroup/detail.vue'),
        name: 'outGroupDetail',
        meta: {
          title: '出团详情',
          activeMenu: '/yanxue/outGroup'
        }
      }
    ]
  }
]

export default routes
