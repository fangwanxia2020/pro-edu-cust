/** @apiName 与我需求匹配 */
import Vue from 'vue'

const selt = Vue.prototype

// 列表
export function demandMatchingList(query) {
  return selt.request({
    url: '/system/demandMatching/demandMatchingList',
    method: 'get',
    params: query
  })
}

// 列表导航列
export function demandCount(orgId) {
  return selt.request({
    url: `/system/demandMatching/count/${orgId}`,
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
//
export function autoRecommendedEnterprise() {
  return selt.request({
    url: `/system/enterpriseRel/autoRecommendedEnterprise`,
    method: 'post'
  })
}
