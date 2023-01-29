import Vue from 'vue'

const selt = Vue.prototype
// 组织列表
export function getSuppList() {
  return selt.request({
    url: '/system/customerPartner/getSuppList',
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

// 修改授信
export function editCustomerCredits(data) {
  return selt.request({
    url: '/system/credits/editCustomerCredits',
    method: 'post',
    data
  })
}

// 获取授信详细信息
export function customerCreditsId(customerCreditsId) {
  return selt.request({
    url: `/system/credits/${customerCreditsId}`,
    method: 'get'
  })
}

// 查询客户授信变更列表
export function ChangeInfoList(params) {
  return selt.request({
    url: '/system/creditChange/getCreditChangeInfoList',
    method: 'get',
    params
  })
}
