import { loadMicroApp } from 'qiankun'
import { getToken } from 'ty-pc/lib/utils/auth'
import style from './style.module.scss'

/**
 * 微应用组件
 * @module components/micro-app
 * @vue-data {import("qiankun").MicroApp} microApp 微应用实例
 */

/**
 * 微应用组件函数，实现动态组件 name 属性
 * @param {string} name 组件 name 属性
 * @returns {import("vue").ComponentOptions}
 */
const createComponent = name => ({
  name,
  data() {
    return {
      microApp: null
    }
  },
  mounted() {
    const { $refs, $route, $store, $router } = this
    const { path, meta } = $route
    const { entry } = meta
    this.microApp = loadMicroApp({
      entry,
      name: path,  // 必须确保唯一
      container: $refs.microApp,
      props: {
        store: $store,
        router: $router,
        token: getToken()
      }
    })
  },
  beforeDestroy() {
    this.microApp.unmount()
  },
  render() {
    return <div
      ref="microApp"
      id="micro-app"
      class={style.MicroApp}
    />
  }
})

export default createComponent