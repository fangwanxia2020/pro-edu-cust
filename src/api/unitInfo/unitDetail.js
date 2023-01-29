/** @apiName 企业信息 */
import Vue from 'vue'

const selt = Vue.prototype

// 基本信息
export function enterprisesGetInfo(orgId) {
  return selt.request({
    url: `/system/enterprises/getInfoByOrgId/${orgId}`,
    method: 'get'
  })
}

// 查询业务申请单列表
export function businessApply(params) {
  return selt.request({
    url: `/system/businessApply/list`,
    method: 'get',
    params
  })
}

// 删除业务申请
export function removeByIds(id) {
  return selt.request({
    url: `/system/businessApply/removeByIds/${id}`,
    method: 'post'
  })
}

// 修改/审核业务申请单
export function editBusinessApply(data) {
  return selt.request({
    url: '/system/businessApply/editBusinessApply',
    method: 'post',
    data
  })
}

// 标签视图列表
export function tagValueList(enterpriseId) {
  return selt.request({
    url: `/system/objRelTag/getTagView/${enterpriseId}`,
    method: 'get'
  })
}
// 查询企业能力列表
export function competence(params) {
  return selt.request({
    url: '/system/competence/list',
    method: 'get',
    params
  })
}

// 详情
export function businessApplyDetail(businessApplyId) {
  return selt.request({
    url: `/system/businessApply/${businessApplyId}`,
    method: 'get'
  })
}

// 查询业务申请单列表
export function enterpriseAuditList(params) {
  return selt.request({
    url: `/system/enterpriseAudit/list`,
    method: 'get',
    params
  })
}
