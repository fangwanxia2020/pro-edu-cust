import Vue from 'vue'

const selt = Vue.prototype

// 获取系统名称配置详细信息
export function configuration(configurationId) {
  return selt.request({
    url: `/basic/sysConfiguration/${configurationId}`,
    method: 'get'
  })
}
