/**
 * 专业共建
 */
const routes = [
  {
    path: '/construction',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '专业共建'
    },
    redirect: '/profession/construction',
    children: [
      {
        path: 'add',
        component: () => import('@/views/profession/construction/addConstruction.vue'),
        name: 'addConstruction',
        meta: {
          title: '专业共建信息',
          activeMenu: '/profession/construction'
        }
      }
    ]
  }
]

export default routes
