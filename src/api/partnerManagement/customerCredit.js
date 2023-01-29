import Vue from 'vue'

const selt = Vue.prototype
// 组织列表
export function removeByIds(customerCreditsIds) {
  return selt.request({
    url: `/system/credits/removeByIds/${customerCreditsIds}`,
    method: 'post'
  })
}

// 组织列表
export function getSuppList() {
  return selt.request({
    url: '/system/customerPartner/getCustList',
    method: 'get'
  })
}

// 新增授信
export function addCustomerCredits(data) {
  return selt.request({
    url: '/system/credits/addCustomerCredits',
    method: 'post',
    data
  })
}

// 修改客户授信
export function editCustomerCredits(data) {
  return selt.request({
    url: '/system/credits/editCustomerCredits',
    method: 'post',
    data
  })
}

// 授信审核
export function creditChange(data) {
  return selt.request({
    url: '/system/creditChange/auditCreditChange',
    method: 'post',
    data
  })
}

// 查询客户授信变更列表
export function getCreditChangeInfoList(params) {
  return selt.request({
    url: '/system/creditChange/getCreditChangeInfoList',
    method: 'get',
    params
  })
}

// 获取授信详细信息
export function customerCreditsId(customerCreditsId) {
  return selt.request({
    url: `/system/credits/${customerCreditsId}`,
    method: 'get'
  })
}
