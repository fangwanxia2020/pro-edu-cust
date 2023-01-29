/**
 * 页面名字
 * @readonly
 * @enum {string}
 */
const PAGE_NAMES = {
  PERSON_BASIC_INFO: '人员基础信息'
}

/**
 * 基础资料管理
 * @module router/modules/basicData
 * @type {import('vue-router').RouteConfig[]}
 */
const routes = [
  {
    path: '/basicData-auth', // 只是为了拿到 layout 组件而占位的路由路径
    name: 'BasicData',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '基础资料管理'
    },
    redirect: '/404',
    children: [
      // 人员基础信息
      {
        path: '/basicData/personBasicInfo/add',
        component: () => import('@/views/basicData/personBasicInfo/editPersonBasicInfo'),
        name: 'PersonBasicInfoAdd',
        hidden: true,
        meta: {
          title: `新增${PAGE_NAMES.PERSON_BASIC_INFO}`,
          activeMenu: '/basicData/personBasicInfo'
        }
      },
      {
        path: '/basicData/personBasicInfo/edit',
        component: () => import('@/views/basicData/personBasicInfo/editPersonBasicInfo'),
        name: 'EditPersonBasicInfo',
        meta: {
          title: `修改${PAGE_NAMES.PERSON_BASIC_INFO}`,
          activeMenu: '/basicData/personBasicInfo'
        }
      },
      {
        path: '/basicData/personBasicInfo/view',
        component: () => import('@/views/basicData/personBasicInfo/editPersonBasicInfo'),
        name: 'PersonBasicInfoView',
        hidden: true,
        meta: {
          title: `查看${PAGE_NAMES.PERSON_BASIC_INFO}`,
          activeMenu: '/basicData/personBasicInfo'
        }
      }
    ]
  }
]

export default routes
