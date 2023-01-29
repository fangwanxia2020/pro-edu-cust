/** @apiName 合作管理 */
import Vue from 'vue'

const selt = Vue.prototype

// 删除合作
export function removeProAndProMissionByPids(projectId) {
  return selt.request({
    url: `/system/project/removeProAndProMissionByPids/${projectId}`,
    method: 'post'
  })
}

// 新增合作
export function addProject(data) {
  return selt.request({
    url: '/system/project/addProject',
    method: 'post',
    data
  })
}

// 编辑合作
export function editProject(data) {
  return selt.request({
    url: '/system/project/editProject',
    method: 'post',
    data
  })
}
// 合作详情
export function getProAndProMissionByPid(id) {
  return selt.request({
    url: `/system/project/getProAndProMissionByPid/${id}`,
    method: 'get'
  })
}

// 添加合作事项
export function addBatchProjectMission(data) {
  return selt.request({
    url: '/system/projectMission/addBatchProjectMission',
    method: 'post',
    data
  })
}

// 编辑合作事项
export function editProjectMission(data) {
  return selt.request({
    url: '/system/projectMission/editProjectMission',
    method: 'post',
    data
  })
}

// 删除合作事项
export function removeProMissionAndFollowByPids(projectId) {
  return selt.request({
    url: `/system/projectMission/removeProMissionAndFollowByPids/${projectId}`,
    method: 'post'
  })
}

// 分享合作事项
export function shareProjectMission() {
  return selt.request({
    url: '/system/projectMission/shareProjectMission',
    method: 'post'
  })
}
// 发布合作事项
export function releaseProjectMission(projectMissionIds) {
  return selt.request({
    url: `/system/projectMission/releaseProjectMission/${projectMissionIds}`,
    method: 'post'
  })
}

// 企业客户列表
export function customerPartner(params) {
  return selt.request({
    url: `/system/customerPartner/list`,
    method: 'get',
    params
  })
}
// 合作单位列表
export function supplierPartner(params) {
  return selt.request({
    url: `/system/supplierPartner/list`,
    method: 'get',
    params
  })
}
// 合作事项列表
export function projectMissionList(params) {
  return selt.request({
    url: `/system/projectMission/list`,
    method: 'get',
    params
  })
}
// 企业合同列表
export function getCustomerContractMainList(params) {
  return selt.request({
    url: `/system/contractMain/getCustomerContractMainList`,
    method: 'get',
    params
  })
}
// 采购合同
export function getPurchaseContractMainList(params) {
  return selt.request({
    url: `/system/contractMain/getPurchaseContractMainList`,
    method: 'get',
    params
  })
}
// 合作事项选择的企业
export function completionUnitList(projectId) {
  return selt.request({
    url: `/system/project/queryRequireCompletionUnitList/${projectId}`,
    method: 'get'
  })
}
