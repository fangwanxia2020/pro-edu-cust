/** @apiName 与我能力匹配 */
import Vue from 'vue'

const selt = Vue.prototype

// 列表
export function abilityMatchingList(query) {
  return selt.request({
    url: '/system/abilityMatching/abilityMatchingList',
    method: 'get',
    params: query
  })
}

// 列表导航列
export function abilityCount(orgId) {
  return selt.request({
    url: `/system/abilityMatching/count/${orgId}`,
    method: 'get'
  })
}

// 修改状态
export function editRecommendedEnterpriseRelStatus(data) {
  return selt.request({
    url: `/system/enterpriseRel/editRecommendedEnterpriseRelStatus`,
    method: 'post',
    data
  })
}
