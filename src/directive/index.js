import hasPermi from './permission/hasPermi'
import hasListPermi from './permission/hasListPermi'
import tempImg from './tempImg'
import enterNumber from './enterNumber'
import focus from './focus'

/**
 * 全局指令以 vue 插件方式统一在此管理
 * @param {Vue} Vue
 */
function install(Vue) {
  Vue.directive('tempImg', tempImg)
  Vue.directive('hasPermi', hasPermi)
  Vue.directive('hasListPermi', hasListPermi)
  Vue.directive('enterNumber', enterNumber)
  Vue.directive('focus', focus)
}

export default install
