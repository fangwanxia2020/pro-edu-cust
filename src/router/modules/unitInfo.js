import { DETAIL } from '@/constants'

/**
 * 单位信息
 * @module router/modules/basicData
 * @type {import('vue-router').RouteConfig[]}
 */
const routes = [
  {
    path: '/unitInfo', // 只是为了拿到 layout 组件而占位的路由路径
    name: 'UnitInfo',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '单位详情'
    },
    redirect: '/unitInfo/unitDeatail/index.vue',
    children: [
      {
        path: `${DETAIL}/:id`,
        component: () => import('@/views/unitInfo/unitDetail/approveDetail.vue'),
        name: 'approveUnitDetail',
        meta: {
          title: '审核详情',
          activeMenu: '/unitInfo/unitDeatail'
        }
      }
    ]
  }
]

export default routes
