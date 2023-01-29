/**
 * 合作伙伴管理
 */
import { ADD, EDIT, DETAIL } from '@/constants'

const routes = [
  {
    path: '/partner',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '客户管理'
    },
    redirect: '/partnerManagement/partner',
    children: [
      {
        path: ADD,
        component: () => import('@/views/partnerManagement/partner/newPartner'),
        name: 'newPartner',
        meta: {
          title: '客户新增',
          activeMenu: '/partnerManagement/partner'
        }
      },
      {
        path: EDIT,
        component: () => import('@/views/partnerManagement/partner/newPartner'),
        name: 'editPartner',
        meta: {
          title: '客户编辑',
          activeMenu: '/partnerManagement/partner'
        }
      },
      {
        path: DETAIL,
        component: () => import('@/views/partnerManagement/partner/newPartner'),
        name: 'detailPartner',
        meta: {
          title: '客户详情',
          activeMenu: '/partnerManagement/partner'
        }
      },
      {
        path: 'foundClient',
        component: () => import('@/views/partnerManagement/partner/foundClient/index'),
        name: 'foundPartnerClient',
        meta: {
          title: '发现客户',
          activeMenu: '/partnerManagement/partner'
        }
      },
      {
        path: `approveClient/${DETAIL}/:id`,
        component: () => import('@/views/partnerManagement/partner/foundClient/approveClient'),
        name: 'approveClient',
        meta: {
          title: '审核',
          activeMenu: '/partnerManagement/partner'
        }
      }
    ]
  },
  {
    path: '/cooperativeUnits',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '合作单位管理'
    },
    redirect: '/partnerManagement/cooperativeUnits',
    children: [
      {
        path: ADD,
        component: () => import('@/views/partnerManagement/cooperativeUnits/addUnit'),
        name: 'newCooperativeUnits',
        meta: {
          title: '合作单位新增',
          activeMenu: '/partnerManagement/cooperativeUnits'
        }
      },
      {
        path: EDIT,
        component: () => import('@/views/partnerManagement/cooperativeUnits/addUnit'),
        name: 'editCooperativeUnits',
        meta: {
          title: '合作单位编辑',
          activeMenu: '/partnerManagement/cooperativeUnits'
        }
      },
      {
        path: DETAIL,
        component: () => import('@/views/partnerManagement/cooperativeUnits/addUnit'),
        name: 'detailCooperativeUnits',
        meta: {
          title: '合作单位详情',
          activeMenu: '/partnerManagement/cooperativeUnits'
        }
      },
      {
        path: 'foundClient',
        component: () => import('@/views/partnerManagement/cooperativeUnits/foundClient/index'),
        name: 'foundCooperativeUnits',
        meta: {
          title: '发现合作单位',
          activeMenu: '/partnerManagement/cooperativeUnits'
        }
      },
      {
        path: `approveClient/${DETAIL}/:id`,
        component: () =>
          import('@/views/partnerManagement/cooperativeUnits/foundClient/approveClient'),
        name: 'approveCooperativeUnitsDetail',
        meta: {
          title: '审核详情',
          activeMenu: '/partnerManagement/cooperativeUnits'
        }
      }
    ]
  },
  {
    path: '/customerCredit',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '客户信用'
    },
    redirect: '/partnerManagement/customerCredit',
    children: [
      {
        path: 'applyList',
        component: () => import('@/views/partnerManagement/customerCredit/applyList'),
        name: 'customerCreditApplyList',
        meta: {
          title: '申请企业列表',
          activeMenu: '/partnerManagement/customerCredit'
        }
      }
    ]
  }
]

export default routes
