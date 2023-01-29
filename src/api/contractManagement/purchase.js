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
    url: '/system/contractMain/addPurchaseContractMain',
    method: 'post',
    data
  })
}

// 查询客户合同详情
export function getCustomer(id) {
  return selt.request({
    url: `/system/contractMain/getPurchaseContractMainById/${id}`,
    method: 'get'
  })
}

// 编辑客户合同
export function editCustomer(data) {
  return selt.request({
    url: '/system/contractMain/editPurchaseContractMain',
    method: 'post',
    data
  })
}

// 新增合同附件信息
export function addContract(data) {
  return selt.request({
    url: '/system/contractAttach/addContractAttach',
    method: 'post',
    data
  })
}

// 删除合同附件信息
export function removeByIds(ids) {
  return selt.request({
    url: `/system/contractAttach/removeByIds/${ids}`,
    method: 'post'
  })
}

// 查询合同附件信息列表
export function attachList(params) {
  return selt.request({
    url: '/system/contractAttach/list',
    method: 'get',
    params
  })
}

// 查询业务操作日志列表
export function businessLog(params) {
  return selt.request({
    url: '/system/businessLog/list',
    method: 'get',
    params
  })
}

// 文件下载
export function down(fileId) {
  return selt.request({
    url: `/file/file/down/${fileId}`,
    method: 'get'
  })
}

// 获取多个文件信息
export function getMore(params) {
  return selt.request({
    url: `/system/file/getMore`,
    method: 'get',
    params
  })
}

// 编辑客户合同
export function getInfo() {
  return selt.request({
    url: '/system/getInfo',
    method: 'get'
  })
}
