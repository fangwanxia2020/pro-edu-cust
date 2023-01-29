// 入驻----------
import Vue from 'vue'

const selt = Vue.prototype

export function enterpriseTypeTemplateList(params) {
  return selt.request({
    url: '/system/enterpriseTypeTemplate/list',
    method: 'get',
    params
  })
}

export function enterpriseAuditList(params) {
  return selt.request({
    url: '/system/enterpriseAudit/list',
    method: 'get',
    params
  })
}
// 企业信息
export function enterprises(enterpriseId) {
  return selt.request({
    url: `/system/enterprises/${enterpriseId}`,
    method: 'get'
  })
}
export function addBusinessApply(data) {
  return selt.request({
    url: '/system/businessApply/addBusinessApply',
    method: 'post',
    data
  })
}
