import Vue from 'vue'

const selt = Vue.prototype

// 出团详细信息
export function groupDetail(orderProjectId) {
  return selt.request({
    url: `/order/orderProject/${orderProjectId}`,
    method: 'get'
  })
}
