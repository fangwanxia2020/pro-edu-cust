/** @apiName 合作意向 */
import Vue from 'vue'

const selt = Vue.prototype

// 列表
export function purposeList(query) {
  return selt.request({
    url: '/system/purpose/list',
    method: 'get',
    params: query
  })
}

// 列表导航列
export function purposeCount(orgId) {
  return selt.request({
    url: `/system/purpose/count/${orgId}`,
    method: 'get'
  })
}
// 修改合作意向状态
export function editCooperativePurposeStatus(data) {
  return selt.request({
    url: `/system/purpose/editCooperativePurposeStatus`,
    method: 'post',
    data
  })
}
