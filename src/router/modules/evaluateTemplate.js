/**
 * 评价模板
 */
import { ADD, EDIT, DETAIL } from '@/constants'

const routes = [
  {
    path: '/templateManage',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '模板管理'
    },
    redirect: '/evaluateTemplate/templateManage',
    children: [
      {
        path: `${ADD}`,
        component: () => import('@/views/evaluateTemplate/templateManage/add/index.vue'),
        name: 'AddEvaluate',
        hidden: true,
        meta: {
          title: '新建评价模板',
          activeMenu: '/evaluateTemplate/templateManage'
        }
      },
      {
        path: `${EDIT}`,
        component: () => import('@/views/evaluateTemplate/templateManage/add/index.vue'),
        name: 'EditEvaluate',
        hidden: true,
        meta: {
          title: '修改评价模板',
          activeMenu: '/evaluateTemplate/templateManage'
        }
      },
      {
        path: `${DETAIL}`,
        component: () => import('@/views/evaluateTemplate/templateManage/add/index.vue'),
        name: 'DetailEvaluate',
        hidden: true,
        meta: {
          title: '评价模板详情',
          activeMenu: '/evaluateTemplate/templateManage'
        }
      }
    ]
  }
]
export default routes
