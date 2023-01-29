/**
 * 页面名字
 * @readonly
 * @enum {string}
 */
const PAGE_NAMES = {
  DICT: '字典数据',
  ROLE: '角色管理',
  USER_TENANT: '用户管理',
  ORG_RECORD: '组织记录',
  USER: '用户管理'
}

/**
 * 系统管理 
 * @module router/modules/system
 * @type {import('vue-router').RouteConfig[]}
 */
const routes = [
  {
    path: '/dict',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: PAGE_NAMES.DICT,
    },
    redirect: '/404',
    children: [
      {
        path: 'type/data/:dictId',
        component: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: {
          title: PAGE_NAMES.DICT,
          activeMenu: '/system/dict'
        }
      }
    ]
  },
    {
    path: '/role',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: PAGE_NAMES.ROLE,
    },
    redirect: '/404',
    children: [
      {
        path: 'permi/:roleId',
        component: () => import('@/views/system/role/permi'),
        name: 'RolePermi',
        meta: {
          title: PAGE_NAMES.ROLE,
          activeMenu: '/system/role'
        }
      }
    ]
  },
  {
    path: '/userTenant',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: PAGE_NAMES.USER_TENANT,
    },
    redirect: '/404',
    children: [
      {
        path: '/system/userTenant/detail',
        component: () => import('@/views/system/userTenant/detail'),
        name: 'UserTenantDetail',
        meta: {
          title: PAGE_NAMES.USER_TENANT + '详情',
          activeMenu: '/system/userTenant'
        }
      },
      {
        path: '/system/userTenant/orgRecord',
        component: () => import('@/views/system/userTenant/orgRecord'),
        name: 'OrgRecord',
        meta: {
          title: PAGE_NAMES.ORG_RECORD,
          activeMenu: '/system/userTenant'
        }
      }
    ]
  }
]

export default routes