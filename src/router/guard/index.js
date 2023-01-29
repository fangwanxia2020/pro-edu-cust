/**
 * 全局路由权限拦截
 * @module router/permission
 */
import { getToken } from 'ty-pc/lib/utils/auth'
import NProgress from 'nprogress'
import store from '@/store'
import { getVisibleConfiguredMenus } from './utils'
import getDynamicRoutes from './dynamic-routes'
import 'nprogress/nprogress.css'
import { title } from '../../settings'

NProgress.configure({ showSpinner: false })

/**
 * 路由白名单正则列表
 * @type {RegExp[]}
 */
const whiteList = [
  /^\/login\/\w*$/,
  /^\/resetPwd\/?$/,
  /^\/register\/?$/,
  /^\/process\/?$/,
  /^\/taskIntro\/?$/,
  /^\/needMarketList\/?$/,
  /^\/needMarketDetail\/?$/,
  /^\/inviteContacts\/?$/
]

/**
 * 全局前置守卫回调
 * @param {import("vue-router").Route} to
 * @param {import("vue-router").Route} from
 * @param {import("vue-router").NavigationGuardNext} next
 * @param {import("vue-router").default} router
 */
const beforeEachCb = async (to, _, next, router) => {
  NProgress.start()
  const token = getToken()
  if (token) {
    // 登录以后
    if (to.path.includes('/login')) {
      next('/')
    } else if (!store.getters.visibleConfiguredMenus) {
      const visibleConfiguredMenus = await getVisibleConfiguredMenus() // 可以改为后端返回的数据
      // 根据给当前用户配置的可见菜单数据添加动态路由
      const dynamicRoutes = getDynamicRoutes(visibleConfiguredMenus)
      store.dispatch('user/setVisibleConfiguredMenus', visibleConfiguredMenus)
      dynamicRoutes.forEach((route) => router.addRoute(route))
      // 如果 addRoute 并未完成，路由守卫会无限执行，直到 addRoute 完成，找到对应的路由
      await store.dispatch('user/getInfo') // 拉取info
      await store.dispatch('user/getConfigToken')
      // 配置系统标题
      await store.dispatch('configuration/getConfiguration')
      const { webName } = store.getters.sysConfig
      document.title = webName || title
      next({
        ...to,
        replace: true
      })
    } else {
      next()
    }
  } else {
    // 未登录
    // 是否在白名单内
    const isInWhiteList = whiteList.some((pattern) => pattern.test(to.path))
    if (isInWhiteList) {
      // 在白名单以内直接放行
      next()
    } else if (to.path == '/login' && to.query && to.query.backUrl) {
      next()
    } else {
      // 否则全部重定向到登录页
      next('/login/')
    }
  }

  NProgress.done()
}

/**
 * 全局后置守卫回调
 * @type {import("vue-router").NavigationGuard}
 */
const afterEachCb = () => NProgress.done()

/**
 * @param {import("vue-router").default} router 实例化后的 VueRouter
 */
export default (router) => {
  router.beforeEach((...args) => beforeEachCb(...args, router))
  router.afterEach(afterEachCb)
}
