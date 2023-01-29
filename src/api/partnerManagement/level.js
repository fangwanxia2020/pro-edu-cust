/** @apiName 客户等级 */
import Vue from 'vue'

const selt = Vue.prototype

// 等级列表
export function getLevelList() {
  return selt.request({
    url: `/system/level/list`,
    method: 'get'
  })
}
// 删除等级
export function removeByIds(partnerLevelIds) {
  return selt.request({
    url: `/system/level/removeByIds/${partnerLevelIds}`,
    method: 'post'
  })
}
// 等级详情
export function getDetails(partnerLevelId) {
  return selt.request({
    url: `/system/level/${partnerLevelId}`,
    method: 'get'
  })
}
// 新增等级
export function addPartnerLevel(data) {
  return selt.request({
    url: '/system/level/addPartnerLevel',
    method: 'post',
    data
  })
}
// 修改等级
export function editPartnerLevel(data) {
  return selt.request({
    url: '/system/level/editPartnerLevel',
    method: 'post',
    data
  })
}

// 修改企业客户等级
export function editCustomerPartner(data) {
  return selt.request({
    url: '/system/customerPartner/editCustomerPartner',
    method: 'post',
    data
  })
}
// 修改合作单位等级
export function editSupplierPartner(data) {
  return selt.request({
    url: '/system/supplierPartner/editSupplierPartner',
    method: 'post',
    data
  })
}
