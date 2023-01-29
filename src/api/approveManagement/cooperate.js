import Vue from 'vue'

const selt = Vue.prototype

// 修改专业共建
export function editPeCooperationDemand(data) {
  return selt.request({
    url: '/system/demand/editPeCooperationDemand',
    method: 'post',
    data
  })
}
