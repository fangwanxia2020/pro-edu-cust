import Vue from 'vue'

const selt = Vue.prototype

// 批量删除合同
export function deleteByIds(ids) {
  return selt.request({
    url: `/system/contractMain/deleteByIds/${ids}`,
    method: 'post'
  })
}

// 合同共享
export function shareContract(id) {
  return selt.request({
    url: `/system/contractMain/shareContract/${id}`,
    method: 'post'
  })
}

// 合同审核
export function contractCheck(data) {
  return selt.request({
    url: '/system/contractMain/contractCheck',
    method: 'post',
    data
  })
}

// 查询合同反馈信息列表
export function Feedback(params) {
  return selt.request({
    url: '/system/contractFeedback/list',
    method: 'get',
    params
  })
}

// 确认一致
export function confirmContract(id) {
  return selt.request({
    url: `/system/contractMain/confirmContract/${id}`,
    method: 'post'
  })
}

// 合同审核
export function contractFeedback(data) {
  return selt.request({
    url: '/system/contractFeedback/addContractFeedback',
    method: 'post',
    data
  })
}
