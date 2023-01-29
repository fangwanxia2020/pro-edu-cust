/**
 * 实训管理
 */
import { ADD, EDIT, DETAIL } from '@/constants'

const COMPREHENSIVE_ACTIVE_MENU = '/trainingManagement/comprehensiveEvaluation'
const routes = [
  {
    path: '/trainingManagement',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '实训管理'
    },
    redirect: '/trainingManagement/studentManagement',
    children: [
      {
        path: 'class',
        component: () => import('@/views/trainingManagement/classManagement/index.vue'),
        name: 'class',
        meta: {
          title: '班级管理',
          activeMenu: '/trainingManagement/classManagement'
        }
      },
      {
        path: 'student',
        component: () => import('@/views/trainingManagement/studentManagement/index.vue'),
        name: 'student',
        meta: {
          title: '学生管理',
          activeMenu: '/trainingManagement/studentManagement'
        }
      },
      {
        path: 'teacher',
        component: () => import('@/views/trainingManagement/teacherManagement/index.vue'),
        name: 'teacher',
        meta: {
          title: '老师管理',
          activeMenu: '/trainingManagement/teacherManagement'
        }
      },
      {
        path: 'trainingContent',
        component: () => import('@/views/trainingManagement/trainingContent/index.vue'),
        name: 'trainingContent',
        meta: {
          title: '培训内容',
          activeMenu: '/trainingManagement/contentManagement'
        }
      },
      {
        path: 'newReword',
        component: () => import('@/views/trainingManagement/reward/newReward.vue'),
        name: 'newReward',
        meta: {
          title: '新增学生奖励',
          activeMenu: '/trainingManagement/reward'
        }
      },
      {
        path: 'reportDetail',
        component: () => import('@/views/trainingManagement/report/reportDetail.vue'),
        name: 'reportDetail',
        meta: {
          title: '学生实训报告',
          activeMenu: '/trainingManagement/report'
        }
      },
      {
        path: 'addReport',
        component: () => import('@/views/trainingManagement/enterpriseReport/addReport.vue'),
        name: 'addReport',
        meta: {
          title: '实训报告',
          activeMenu: '/trainingManagement/addReport'
        }
      },
      {
        path: 'etpReportDetail',
        component: () => import('@/views/trainingManagement/enterpriseReport/etpReportDetail.vue'),
        name: 'etpReportDetail',
        meta: {
          title: '报告详情',
          activeMenu: '/trainingManagement/etpReportDetail'
        }
      },
      {
        path: 'editEnterReport',
        component: () => import('@/views/trainingManagement/enterpriseReport/editEnterReport.vue'),
        name: 'editEnterReport',
        meta: {
          title: '编辑报告',
          activeMenu: '/trainingManagement/editEnterReport'
        }
      }
    ]
  },
  {
    path: '/comprehensiveEvaluation',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '学生综合评价'
    },
    redirect: COMPREHENSIVE_ACTIVE_MENU,
    children: [
      {
        path: `${ADD}`,
        component: () => import('@/views/trainingManagement/comprehensiveEvaluation/add/index.vue'),
        name: 'AddComprehensiveEvaluate',
        hidden: true,
        meta: {
          title: '新建学生评价',
          activeMenu: COMPREHENSIVE_ACTIVE_MENU
        }
      },
      {
        path: `${EDIT}`,
        component: () => import('@/views/trainingManagement/comprehensiveEvaluation/add/index.vue'),
        name: 'EditComprehensiveEvaluate',
        hidden: true,
        meta: {
          title: '修改学生评价',
          activeMenu: COMPREHENSIVE_ACTIVE_MENU
        }
      },
      {
        path: `${DETAIL}`,
        component: () => import('@/views/trainingManagement/comprehensiveEvaluation/add/index.vue'),
        name: 'DetailComprehensiveEvaluate',
        hidden: true,
        meta: {
          title: '学生评价详情',
          activeMenu: COMPREHENSIVE_ACTIVE_MENU
        }
      },
      {
        path: `evaluateSummary`,
        component: () =>
          import('@/views/trainingManagement/comprehensiveEvaluation/evaluateSummary.vue'),
        name: 'EvaluateSummary',
        hidden: true,
        meta: {
          title: '评价汇总',
          activeMenu: COMPREHENSIVE_ACTIVE_MENU
        }
      }
    ]
  }
]

export default routes
