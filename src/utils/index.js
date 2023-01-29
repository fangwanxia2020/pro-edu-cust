/**
 * 项目通用工具模块
 * @module utils
 */
import { getAssembleTree as $getAssembleTree, getFlatTree as $getFlatTree } from './tool'
import { type as $type, test as $test } from './validate'

/**
 * 工具类插件函数
 * @param {import("vue").VueConstructor} Vue Vue 构造器
 */
const install = (Vue) => {
  Object.assign(Vue.prototype, {
    $type,
    $test,
    $getAssembleTree,
    $getFlatTree
  })
}

export default install
