/**
 * 系统工具
 * @module router/modules/tool
 * @type {import('vue-router').RouteConfig[]}
 */
const routes = [
  {
    path: '/gen',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '系统工具'
    },
    redirect: '/404',
    children: [
      {
        path: 'edit',
        component: () => import('@/views/tool/gen/editTable'),
        name: 'GenEdit',
        meta: {
          title: '修改生成配置',
          activeMenu: '/tool/gen'
        }
      }
    ]
  }
]

export default routes
