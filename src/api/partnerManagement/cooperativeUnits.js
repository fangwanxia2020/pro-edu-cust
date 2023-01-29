import Vue from 'vue'

const selt = Vue.prototype
// 组织列表
export function getOrgList(relevanceOrgId) {
  return selt.request({
    // url: `/system/system/org/getInfo/${relevanceOrgId}`,
    url: `/system/enterprises/getInfoByOrgId/${relevanceOrgId}`,
    method: 'get'
  })
}
// 绑定企业
export function bindCustomerPartner(data) {
  return selt.request({
    url: `/system/supplierPartner/bindSupplierPartner`,
    method: 'post',
    data
  })
}
// 联系人列表
export function contactsList(params) {
  return selt.request({
    url: `/system/supplierPartner/contactsList`,
    method: 'get',
    params
  })
}

// 新增合作单位联系人
export function addContacts(data) {
  return selt.request({
    url: `/system/supplierPartner/addContacts`,
    method: 'post',
    data
  })
}
// 修改合作单位联系人
export function editContacts(data) {
  return selt.request({
    url: `/system/supplierPartner/editContacts`,
    method: 'post',
    data
  })
}

// 删除合作单位联系人
export function removeContactsByIds(ids) {
  return selt.request({
    url: `/system/supplierPartner/removeContactsByIds/${ids}`,
    method: 'post'
  })
}
// 删除合作单位
export function removeByIds(ids) {
  return selt.request({
    url: `/system/supplierPartner/removeByIds/${ids}`,
    method: 'post'
  })
}

// 添加潜在合作单位到通讯录
export function addAddressBook(orgId) {
  return selt.request({
    url: `/system/supplierPartner/addAddressBook/${orgId}`,
    method: 'post'
  })
}
// 添加申请列表到通讯录
export function checkAddAddressBook(partnerId) {
  return selt.request({
    url: `/system/supplierPartner/checkAddAddressBook/${partnerId}`,
    method: 'get'
  })
}

// 合作单位申请列表-审核
export function checkSupplierApply(data) {
  return selt.request({
    url: `/system/supplierPartner/checkCustomerApply`,
    method: 'post',
    data
  })
}

// 获取合作单位详细信息
export function supplierPartnerInfo(supplierId) {
  return selt.request({
    url: `/system/supplierPartner/${supplierId}`,
    method: 'get'
  })
}
