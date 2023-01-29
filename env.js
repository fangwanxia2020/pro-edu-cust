/**
 * 项目动态环境变量，统一在此重新导出，可以在此作临时性更改，在 .env 加运行时环境变量同时需要在此也同步添加
 * 注意，更改仅限于开发调试，如果需要打包到生产环境的话，需要对全局环境变量保持引用
 * @module env
 */
const {
  VUE_APP_BASE_API,
  VUE_APP_PREVIEW_URL,
  VUE_APP_BASE_URL,
  VUE_APP_APPID,
  VUE_APP_APPSCRIPT,
  VUE_APP_CONFIG_URL,
  VUE_APP_GETTOKEN_URI,
  VUE_APP_PREFIX_URI
} = process.env

module.exports = {
  BASE_API: VUE_APP_BASE_API,
  PREVIEW_URL: VUE_APP_PREVIEW_URL,
  BASE_URL: VUE_APP_BASE_URL,
  APPID: VUE_APP_APPID,
  APPSCRIPT: VUE_APP_APPSCRIPT,
  URL: VUE_APP_CONFIG_URL,
  GETTOKEN_URI: VUE_APP_GETTOKEN_URI,
  PREFIX_URI: VUE_APP_PREFIX_URI
}
