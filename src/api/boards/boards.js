/** @apiName 专业共建看板 */
import Vue from 'vue'

const selt = Vue.prototype

// 专业共建看板
export function demandCount() {
  return selt.request({
    url: '/system/demand/count',
    method: 'get'
  })
}
