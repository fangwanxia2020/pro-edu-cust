import Vue from 'vue'
import VueRouter from 'vue-router'
import guard from './guard'
// 系统管理
import systemRoutes from './modules/system'
// 基础资料管理
import basicDataRoutes from './modules/basicData'
// 工具
import toolRoutes from './modules/tool'
// 合作管理
import cooperationRoutes from './modules/cooperation'
// 合同管理
import contractManagemant from './modules/contractManagement'
// 合作伙伴管理
import partnerManagement from './modules/partnerManagement'
// 供需市场
import needMarket from './modules/needMarket'
// 能力管理
import abilieManagement from './modules/abilieManagement'
// 消息管理
import information from './modules/information'
// 消息管理
import unitInfo from './modules/unitInfo'
// 专业管理
import professionRoutes from './modules/profession'
// 商品中心
import goodsCenter from './modules/goodsCenter'
// 订单管理
import orderCenterRoutes from './modules/orderCenter'
// 模板详情页
import manageRoutes from './modules/management'
// 实训管理
import trainingRoutes from './modules/trainingManagement'
// 实训管理
import evaluateTemplateRoutes from './modules/evaluateTemplate'
// 研学活动管理
import yanxueRoutes from './modules/yanxue'

Vue.use(VueRouter)

/**
 * @type {import("vue-router").RouteRecord[]}
 */
export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    hidden: true
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register.vue'),
    hidden: true
  },
  {
    path: '/resetPwd',
    name: 'ResetPwd',
    component: () => import('@/views/resetPwd.vue'),
    hidden: true
  },
  {
    path: '/taskIntro',
    name: 'taskIntro',
    component: () => import('@/views/taskIntro.vue'),
    hidden: true
  },
  {
    path: '/needMarketList',
    name: 'needMarketList',
    component: () => import('@/views/needMarket/service'),
    hidden: true
  },
  {
    path: '/needMarketDetail',
    name: 'needMarketDetail',
    component: () => import('@/views/needMarket/service/goodsDetail'),
    hidden: true
  },
  {
    path: '/process/:id',
    name: 'Process',
    component: () => import('@/views/applyOccupancy/process/index.vue'),
    hidden: true
  },
  {
    path: '/process',
    name: 'Process',
    component: () => import('@/views/applyOccupancy/process/index.vue'),
    hidden: true
  },
  {
    path: '/inviteContacts',
    name: 'inviteContacts',
    component: () => import('@/views/cooperation/contacts/inviteContacts.vue'),
    hidden: true
  },
  ...systemRoutes,
  ...basicDataRoutes,
  ...toolRoutes,
  ...cooperationRoutes,
  ...needMarket,
  ...contractManagemant,
  ...partnerManagement,
  ...abilieManagement,
  ...information,
  ...unitInfo,
  ...professionRoutes,
  ...goodsCenter,
  ...orderCenterRoutes,
  ...manageRoutes,
  ...trainingRoutes,
  ...evaluateTemplateRoutes,
  ...yanxueRoutes
]

const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes
  })

const router = createRouter()

// 解决 Loading chunk (\d)+ failed 问题
router.onError((error) => {
  const pattern = /Loading chunk/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed && error.type === 'missing') {
    router.push(targetPath)
  }
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 新路由实例matcer，赋值给旧路由实例的matcher，（相当于replaceRouter）
}

// 解决 Vue-router 在 3.1 之后把 $router.push() 方法改为了 Promise 后导致的报错问题
const vueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, onComplete, onAbort) {
  if (onComplete || onAbort) {
    return vueRouterPush.call(this, location, onComplete, onAbort)
  }
  return vueRouterPush.call(this, location).catch((err) => err)
}

guard(router)

export default router
