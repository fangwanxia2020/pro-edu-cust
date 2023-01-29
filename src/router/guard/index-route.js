import path from 'path'
import { getVisibleNodes } from '@/utils/tool'

/**
 * 获取首页路由
 * @param {import("vue-router").RouteRecord[]} routes 本地静态路由与后端返回经过处理后的动态路由结合的路由
 * @returns {import("vue-router").RouteRecord} 首页重定向路由
 */
const getIndexRoute = routes => {
  const showRoutes = getVisibleNodes(routes)
  /**
   * 递归抽取每一层的第一个路由
   * @param {import("vue-router").RouteRecord[]} routes
   * @param {string} [redirect] 首页重定向
   * @returns {import("vue-router").RouteRecord} 首页重定向路由
   */
  const fn = (routes, redirect = '') => {
    const [route] = routes
    const children = Array.isArray(route.children) ? route.children : []
    redirect = path.resolve(redirect, route.path)
    if (children.length) {
      return fn(children, redirect)
    }
    return {
      path: '/',
      redirect,
      hidden: true
    }
  }

  const indexRoute = fn(showRoutes)

  return indexRoute
}

export default getIndexRoute
