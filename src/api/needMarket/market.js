/** @apiName 企业基础信息(平台) */
import Vue from 'vue'

const selt = Vue.prototype

// 项目列表管理
export function demandList(params) {
  return selt.request({
    url: '/system/demand/list',
    method: 'get',
    params
  })
}

// 获取专业共建详细信息
export function demandDetail(cooperationDemandId) {
  return selt.request({
    url: `/system/demand/${cooperationDemandId}`,
    method: 'get'
  })
}

// 企业能力列表
export function platformList(params) {
  return selt.request({
    url: '/system/competence/platformList',
    method: 'get',
    params
  })
}

// 获取企业能力详细信息
export function competenceDetail(enterpriseCompetenceId) {
  return selt.request({
    url: `/system/competence/${enterpriseCompetenceId}`,
    method: 'get'
  })
}

// 新增合作意向
export function addCooperativePurpose(data) {
  return selt.request({
    url: '/system/purpose/addCooperativePurpose',
    method: 'post',
    data
  })
}
