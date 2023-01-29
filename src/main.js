import Vue from 'vue'
import ElementUI from 'element-ui'
import $md5 from 'js-md5' // 引入加密，全局定义

import {
  TyTable,
  PcForm,
  TyDialog,
  TyBusinessCrud,
  TyIcon,
  TyCheckbox,
  TyUploadFile,
  TyDictionary,
  TySelectArea,
  TyEditor,
  TyPcForm,
  TyUpload,
  TyFormContainer,
  TyBusinessCrud2,
  TyExport
} from 'ty-pc'
import { previewFile } from 'ty-pc/lib/utils/common'
import { initApi } from 'ty-pc/lib/utils/auth' // 初始化组件变量
import toDateUtil from 'ty-pc/lib/utils/date' // 时间转换工具
import { BASE_API, PREVIEW_URL } from '/env' // 动态环境变量
import * as echarts from 'echarts' // Echarts 5.x 支持的引入方式
import Print from 'vue-print-nb'
import VueClipBoard from 'vue-clipboard2'
import Base64 from './utils/base64.js'
import base from './utils/base'
import common from './utils/common'
import uiElement from './utils/ui-element'
import directive from './directive' // 引入全局指令

// 打印功能
import { getDicts } from './api/system/dict/data'
import { parseTime, selectDictLabel, addDateRange, resetForm } from './utils/tool'

import App from './App'
import store from './store'
import router from './router'
// import './permission'  // 路由守卫
import 'ty-pc/lib/index/style.css'
import 'normalize.css/normalize.css'
import './assets/styles/index.scss' // 全局 css

Vue.config.productionTip = false

// 全局设置点遮罩不关闭弹框
ElementUI.Dialog.props.closeOnClickModal.default = false

// Vue 原型功能挂载
Object.assign(Vue.prototype, {
  ...base,
  ...common,
  ...uiElement,
  baseUrl: BASE_API,
  getDicts,
  parseTime,
  toDateUtil,
  resetForm,
  selectDictLabel,
  $md5,
  $Base64: Base64,
  addDateRange,
  previewFile: (url) => previewFile(PREVIEW_URL, url), // 引入预览文件方法
  $echarts: echarts
})

// m1:原先接口定义 m2:东云接口定义，一定要先设置 Vue 原型上的 baseUrl
Vue.prototype.request = initApi(
  {
    router,
    tokenkey: 'pro_cust_token',
    outVue: Vue
  },
  'm2'
)

Vue.use(Print)
Vue.use(VueClipBoard)
Vue.use(directive)
Vue.use(ElementUI)
Vue.use(TyTable)
Vue.use(TySelectArea)
Vue.use(TyDialog)
Vue.use(TyCheckbox)
Vue.use(PcForm)
Vue.use(TyBusinessCrud)
Vue.use(TyIcon)
Vue.use(TyUploadFile)
Vue.use(TyDictionary)
Vue.use(TyEditor)
Vue.use(TyPcForm)
Vue.use(TyUpload)
Vue.use(TyFormContainer)
Vue.use(TyBusinessCrud2)
Vue.use(TyExport)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
