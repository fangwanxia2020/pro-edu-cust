import Vue from 'vue'

const selt = Vue.prototype

// 查询企业客户列表
export function customerPartner(params) {
  return selt.request({
    url: '/system/customerPartner/list',
    method: 'get',
    params
  })
}

// 查询合作单位列表
export function supplierPartner(params) {
  return selt.request({
    url: '/system/supplierPartner/list',
    method: 'get',
    params
  })
}

// 获取合同编号
export function getCodeNo() {
  return selt.request({
    url: '/system/contractMain/getCodeNo',
    method: 'post'
  })
}

// 新增客户合同
export function addCustomer(data) {
  return selt.request({
    url: '/system/contractMain/addCustomerContractMain',
    method: 'post',
    data
  })
}

// 查询客户合同详情
export function getCustomer(id) {
  return selt.request({
    url: `/system/contractMain/getCustomerContractMainById/${id}`,
    method: 'get'
  })
}

// 编辑客户合同
export function editCustomer(data) {
  return selt.request({
    url: '/system/contractMain/editCustomerContractMain',
    method: 'post',
    data
  })
}

// 获取当前用户信息
export function getInfo() {
  return selt.request({
    url: '/system/getInfo',
    method: 'get'
  })
}
