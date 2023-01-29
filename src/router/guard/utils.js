import { getRouters } from '@/api/user'
import { getVisibleNodes, getFlatTree, getAssembleTree } from '@/utils/tool'

/**
 * 获取名称
 * @param {string} menuPath 菜单唯一标识
 * @returns {string}
 */
export const getName = (menuPath) => {
  return menuPath
    .replace(/\//g, '')
    .split('-')
    .map((path) => {
      const characters = [...path]
      const firstLetter = characters[0]
      if (firstLetter) {
        characters[0] = firstLetter.toUpperCase()
      }
      return characters.join('')
    })
    .join('')
}

/**
 * 判断当前菜单节点(菜单类型为菜单)组件类型是否为组件或微应用叶子节点，
 * 如果不是则继续递归查找它包含的所有叶子节点中是否存在组件或微应用类型，
 * 如果都不满足则删除当前节点
 * @param {import("@/api/system/menu").SysMenuRoute} menu
 * @returns {boolean}
 */
export const getIsRouteMenu = (menu) => {
  const componentTypes = []
  const _componentTypes = ['COMPONENT', 'QIANKUN']
  const children = Array.isArray(menu.children) ? menu.children : []
  if (!children.length) {
    return menu.menuType === 'C' && _componentTypes.includes(menu.componentType)
  }

  /**
   * 递归查找当前菜单节点所有叶子节点是否还存在组件或微前端类型
   * @param {import("@/api/system/menu").SysMenuRoute[]} menus
   */
  const fn = (menus) => {
    menus.forEach((menu) => {
      const children = Array.isArray(menu.children) ? menu.children : []
      if (!children.length && menu.menuType === 'C') {
        componentTypes.push(menu.componentType)
      } else {
        fn(children)
      }
    })
  }

  fn(children)

  return componentTypes.some((componentType) => _componentTypes.includes(componentType))
}

/**
 * 通过查询当前views中的文件目录与
 * @param {object} menu 菜单项
 * @returns {boolean} 是否存在该文件目录
 */
function filterRouter(menu) {
  const componentList = require.context(`@/views`, true, /\.vue$/).keys() // 获取views文件下的所有文件目录
  if (menu.component !== 'Layout') {
    const hadComponent = componentList.find((item) => {
      return item.match(new RegExp(menu.component, 'gi'))
    })
    return !!hadComponent
  }
  return true
}

/**
 * @returns {import("@/api/system/menu").SysMenuRoute[]} 给当前用户所配置的可见菜单
 */
export const getVisibleConfiguredMenus = async () => {
  let res = {}
  try {
    res = await getRouters()
  } catch {
    console.log('')
  }
  const resData = res.data || []
  let visibleConfiguredMenus = getVisibleNodes(resData, filterRouter)
  // 扁平化树形之后排序再组装回去
  // const flatMenus = getFlatTree(visibleConfiguredMenus)
  // flatMenus.sort((menuA, menuB) => menuA.orderNum - menuB.orderNum)  // 升序排列
  // visibleConfiguredMenus = getAssembleTree(flatMenus)
  return visibleConfiguredMenus
}
