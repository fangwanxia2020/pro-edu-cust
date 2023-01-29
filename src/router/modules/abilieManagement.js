/**
 * 能力管理
 */
const routes = [
  {
    path: '/companyAbilie',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '单位能力'
    },
    redirect: '/abilieManagement/companyAbilie',
    children: [
      {
        path: 'add/:id',
        component: () => import('@/views/formComponent/index'),
        name: 'companyAbilieAdd',
        meta: {
          title: '单位能力新增',
          activeMenu: '/abilieManagement/companyAbilie'
        }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/formComponent/index'),
        name: 'companyAbilieEdit',
        meta: {
          title: '单位能力编辑',
          activeMenu: '/abilieManagement/companyAbilie'
        }
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/formComponent/index'),
        name: 'companyAbilieDetail',
        meta: {
          title: '单位能力详情',
          activeMenu: '/abilieManagement/companyAbilie'
        }
      }
    ]
  }
]

export default routes
