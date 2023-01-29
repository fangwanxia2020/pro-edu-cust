/**
 * 配置管理
 */
const routes = [
  // {
  //   path: '/template',
  //   component: () => import('@/layout'),
  //   hidden: true,
  //   meta: {
  //     title: '模板配置管理'
  //   },
  //   redirect: '/management/template',
  //   children: [
  //     {
  //       path: 'add',
  //       component: () => import('@/views/management/template/newTemplate'),
  //       name: 'newTemplate',
  //       meta: {
  //         title: '新增模板配置',
  //         activeMenu: '/management/template'
  //         // isCreatePage: true// 打开新页面
  //       }
  //     },
  //     {
  //       path: 'edit',
  //       component: () => import('@/views/management/template/newTemplate'),
  //       name: 'editemplate',
  //       meta: {
  //         title: '修改模板配置',
  //         activeMenu: '/management/template'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/tableConfigure',
  //   component: () => import('@/layout'),
  //   hidden: true,
  //   meta: {
  //     title: '模板配置管理'
  //   },
  //   redirect: '/management/tableConfigure',
  //   children: [
  //     {
  //       path: 'add',
  //       component: () => import('@/views/management/tableConfigure/newTemplate'),
  //       name: 'newTemplate',
  //       meta: {
  //         title: '新增模板配置',
  //         activeMenu: '/management/tableConfigure'
  //         // isCreatePage: true// 打开新页面
  //       }
  //     },
  //     {
  //       path: 'edit',
  //       component: () => import('@/views/management/tableConfigure/newTemplate'),
  //       name: 'editemplate',
  //       meta: {
  //         title: '修改模板配置',
  //         activeMenu: '/management/tableConfigure'
  //       }
  //     },
  //     {
  //       path: 'templateDetail/:id',
  //       component: () => import('@/views/configMenu/detail'),
  //       name: 'templateDetail',
  //       meta: {
  //         title: '跳转配置页',
  //         activeMenu: '/configMenu/detail'
  //       }
  //     }
  //   ]
  // }

  {
    path: '/tableConfigure',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '模板配置管理'
    },
    redirect: '/management/tableConfigure',
    children: [
      {
        path: 'templateDetail/:id',
        component: () => import('@/views/configMenu/detail'),
        name: 'templateDetail',
        meta: {
          title: '跳转配置页',
          activeMenu: '/configMenu/detail'
        }
      }
    ]
  }
]

export default routes
