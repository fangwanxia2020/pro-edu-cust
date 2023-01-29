import Vue from 'vue'

const selt = Vue.prototype
// 组织列表
export function getOrgList(relevanceOrgId) {
  return selt.request({
    url: `/system/system/org/getInfo/${relevanceOrgId}`,
    method: 'get'
  })
}
// 组织列表
export function getInfoByOrgId(relevanceOrgId) {
  return selt.request({
    url: `/system/enterprises/getInfoByOrgId/${relevanceOrgId}`,
    method: 'get'
  })
}

// 绑定企业
export function bindCustomerPartner(data) {
  return selt.request({
    url: `/system/customerPartner/bindCustomerPartner`,
    method: 'post',
    data
  })
}
// 组织列表
export function contactsList(params) {
  return selt.request({
    url: `/system/customerPartner/contactsList`,
    method: 'get',
    params
  })
}

// 新增企业客户联系人
export function addContacts(data) {
  return selt.request({
    url: `/system/customerPartner/addContacts`,
    method: 'post',
    data
  })
}
// 修改企业客户联系人
export function editContacts(data) {
  return selt.request({
    url: `/system/customerPartner/editContacts`,
    method: 'post',
    data
  })
}

// 删除企业客户联系人
export function removeContactsByIds(ids) {
  return selt.request({
    url: `/system/customerPartner/removeContactsByIds/${ids}`,
    method: 'post'
  })
}
// 删除企业客户
export function removeByIds(ids) {
  return selt.request({
    url: `/system/customerPartner/removeByIds/${ids}`,
    method: 'post'
  })
}

// 添加潜在客户到通讯录
export function addAddressBook(orgId) {
  return selt.request({
    url: `/system/customerPartner/addAddressBook/${orgId}`,
    method: 'post'
  })
}
// 添加申请列表到通讯录
export function checkAddAddressBook(partnerId) {
  return selt.request({
    url: `/system/customerPartner/checkAddAddressBook/${partnerId}`,
    method: 'get'
  })
}

// 企业客户申请列表-审核
export function checkSupplierApply(data) {
  return selt.request({
    url: `/system/customerPartner/checkSupplierApply`,
    method: 'post',
    data
  })
}

// 查询基础业务分类列表
export function enterpriseTypeTemplateList(params) {
  return selt.request({
    url: '/system/enterpriseTypeTemplate/list',
    method: 'get',
    params
  })
}

// 获取企业客户详细信息
export function customerPartnerInfo(customerId) {
  return selt.request({
    url: `/system/customerPartner/${customerId}`,
    method: 'get'
  })
}
