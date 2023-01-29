import path from 'path'
import { routes } from '@/router'
import createMicroApp from '@/components/micro-app'
import createRouterViewCache from '@/components/router-view-cache'
import { getName, getIsRouteMenu } from './utils'
import getIndexRoute from './index-route'
import notFoundRoute from './not-found-route'

/**
 * 将后端返回的菜单数据，处理成 vue-router 动态路由列表
 * @param {import("@/api/system/menu").SysMenuRoute[]} menus
 * @returns {import("vue-router").RouteRecord[]} vue-router 动态路由
 */
const getDynamicRoutes = menus => {
  const copyMenus = JSON.parse(JSON.stringify(menus || []))  // 复制一份数据
  /**
   * 递归函数
   * @param {import("@/api/system/menu").SysMenuRoute[]} menus 菜单路由
   * @param {number} [level] 递归深度
   * @param {string} [activeMenu] 激活菜单
   * @returns {import("vue-router").RouteRecord[]} vue-router 动态路由
   */
  const fn = (menus, level = 1, activeMenu = '') => {
    return menus.reduce((dynamicRoutes, menu) => {
      const children = Array.isArray(menu.children) ? menu.children : []
      const name = getName(menu.path)
      const dynamicRoute = {
        component: createRouterViewCache(name),
        name,
        path: menu.path,
        hidden: menu.hidden,
        // alwaysShow: menu.alwaysShow,
        // menuType: menu.menuType,
        meta: {
          ...menu.meta,
          cache: true  // 缓存属性
        }
      }

      // if (!getIsRouteMenu(menu)) {  // 如果当前节点下包含的所有叶子节点都没有微前端和组件类型的菜单则删掉当前节点
      //   return dynamicRoutes
      // }

      if (level === 1) {  // 第一层
        dynamicRoute.component = () => import('@/layout/index.vue')
        dynamicRoute.path = path.resolve(menu.path)
      }

      if (children.length) {  // 不是叶子节点则加上路由 children
        dynamicRoute.children = fn(children, level + 1, path.resolve(activeMenu, menu.path))  // 注意不要用 ++level 否则会导致原始作用域的值也会增加
      } else if (menu.componentType === 'COMPONENT' || !menu.componentType) {
        const componentPath = path.resolve(menu.component)  // 由于 path 模块不能在运行时调用，必须独立调用
        /*
        支持用户配置时可选 `/` 前缀，可选文件后缀
        运行时不能识别 `@` 符号，所以只能固定好 `@/views` 目录
         */
        const component = () => import(`@/views${componentPath}`)
        if (level === 1) {  // 配置一级菜单处理
          dynamicRoute.children = [{
            path: '',
            component,
            name: dynamicRoute.name,
            meta: dynamicRoute.meta
          }]
        } else {  // 如果不是一级菜单则正常匹配
          dynamicRoute.component = component
        }
      } else if (menu.componentType === 'QIANKUN') {
        const childName = dynamicRoute.name + '_micro-child'
        dynamicRoute.component = createMicroApp(dynamicRoute.name)  // 使用动态组件 name
        dynamicRoute.meta.cache = false  // 微前端独立缓存自己的业务组件
        dynamicRoute.meta.entry = menu.component  // 添加微前端链接地址
        // 为了兼容子应用的静态路由，要配置一个当前 path 下的所有路由规则的 children
        dynamicRoute.children = [{
          path: '*',
          name: childName,
          meta: {
            ...dynamicRoute.meta,
            activeMenu: path.resolve(activeMenu, menu.path)
          }
        }]
      }
      return dynamicRoutes.concat(dynamicRoute)
    }, [])
  }

  const dynamicRoutes = fn(copyMenus)
  const allRoutes = routes.concat(dynamicRoutes)
  const indexRoute = getIndexRoute(allRoutes)
  dynamicRoutes.unshift(indexRoute)  // 在动态路由列表头部加上首页重定向路由
  dynamicRoutes.push(notFoundRoute)  // 在动态路由尾部加上 404
  return dynamicRoutes
}

export default getDynamicRoutes