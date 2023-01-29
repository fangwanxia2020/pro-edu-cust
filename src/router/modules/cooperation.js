/**
 * 合作管理
 */
const routes = [
  {
    path: '/cooperativeManage',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '合作管理'
    },
    redirect: '/cooperation/cooperativeManage',
    children: [
      {
        path: 'add',
        component: () => import('@/views/cooperation/cooperativeManage/newCooperation'),
        name: 'newCooperation',
        meta: {
          title: '合作新增',
          activeMenu: '/cooperation/cooperativeManage'
        }
      },
      {
        path: 'mission',
        component: () => import('@/views/cooperation/cooperativeManage/missionList'),
        name: 'missionList',
        meta: {
          title: '合作事项',
          activeMenu: '/cooperation/cooperativeManage'
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/cooperation/cooperativeManage/newCooperation'),
        name: 'editCooperation',
        meta: {
          title: '合作编辑',
          activeMenu: '/cooperation/cooperativeManage'
        }
      },
      {
        path: 'details',
        component: () => import('@/views/cooperation/cooperativeManage/newCooperation'),
        name: 'cooperationDetails',
        meta: {
          title: '合作详情',
          activeMenu: '/cooperation/cooperativeManage'
        }
      }
    ]
  },
  {
    path: '/intention',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '合作意向'
    },
    redirect: '/cooperation/intention',
    children: [
      {
        path: 'record',
        component: () => import('@/views/cooperation/intention/followRecord/followRecord.vue'),
        name: 'followRecord',
        meta: {
          title: '跟进记录',
          activeMenu: '/cooperation/intention'
        }
      }
    ]
  },
  {
    path: '/needMatch',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '与我需求匹配'
    },
    redirect: '/cooperation/needMatch',
    children: [
      {
        path: 'record',
        component: () => import('@/views/cooperation/needMatch/followRecord/followRecord.vue'),
        name: 'followRecord2',
        meta: {
          title: '跟进记录',
          activeMenu: '/cooperation/needMatch'
        }
      }
    ]
  },
  {
    path: '/abilityMatch',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '与我能力匹配'
    },
    redirect: '/cooperation/abilityMatch',
    children: [
      {
        path: 'record',
        component: () => import('@/views/cooperation/abilityMatch/followRecord/followRecord.vue'),
        name: 'followRecord3',
        meta: {
          title: '跟进记录',
          activeMenu: '/cooperation/abilityMatch'
        }
      }
    ]
  },
  {
    path: '/workWithMe',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '与我协同'
    },
    redirect: '/cooperation/workWithMe',
    children: [
      {
        path: 'cooperationDetail',
        component: () => import('@/views/cooperation/workWithMe/detail'),
        name: 'CooperationDetail',
        meta: {
          title: '合作事项详情',
          activeMenu: '/cooperation/cooperationDetail'
        }
      }
    ]
  },
  {
    path: '/coopereEvalue',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '合作评价'
    },
    redirect: '/cooperation/coopereEvalue',
    children: [
      {
        path: 'detail',
        component: () => import('@/views/cooperation/workWithMe/detail'),
        name: 'coopereEvalueDetail',
        meta: {
          title: '合作评价详情',
          activeMenu: '/cooperation/coopereEvalue'
        }
      }
    ]
  },
  {
    path: '/contacts',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '协同联系人'
    },
    redirect: '/cooperation/contacts',
    children: [
      {
        path: 'inviteContacts',
        component: () => import('@/views/cooperation/contacts/inviteContacts'),
        name: 'inviteContacts',
        meta: {
          title: '邀请',
          activeMenu: '/cooperation/contacts'
        }
      }
    ]
  }
]

export default routes
