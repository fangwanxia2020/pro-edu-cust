import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const context = require.context('./modules', true, /\.js$/)
const modules = context.keys().reduce((modules, filePath) => {
  const moduleKey = filePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const file = context(filePath)
  modules[moduleKey] = file.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

// 皮肤设置
const theme = store.state.theme.theme

store.dispatch('theme/setTheme', theme)

export default store
