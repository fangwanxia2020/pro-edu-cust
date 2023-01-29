import path from 'path'
import { getName } from './utils'

/**
 * 分离出微前端的路由
 * @param {import("@/api/system/menu").SysMenuRoute[]} menus
 * @returns {import("qiankun").RegistrableApp[]} 微前端路由
 */
const getMicroRoutes = menus => {
  const copyMenus = JSON.parse(JSON.stringify(menus || []))
  /**
   * 递归函数
   * @param {import("@/api/system/menu").SysMenuRoute[]} menus 菜单路由
   * @param {string} basePath 祖先级菜单拼接路径
   * @returns {import("qiankun").RegistrableApp[]} 微前端路由
   */
  const fn = (menus, basePath = '') => {
    return menus.reduce((microRoutes, menu) => {
      const children = Array.isArray(menu.children) ? menu.children : []
      if (children.length) {
        microRoutes.push(...fn(children, path.resolve(basePath, menu.path)))
      } else if (menu.menuType === 'C' && menu.componentType === 'QIANKUN') {
        microRoutes.push({
          name: getName(menu.path),
          entry: menu.component,
          activeRule: `${process.env.BASE_URL}#${path.resolve(basePath, menu.path)}`,
          container: '#micro-app'
        })
      }
      return microRoutes
    }, [])
  }

  const microRoutes = fn(copyMenus)

  return microRoutes
}

export default getMicroRoutes