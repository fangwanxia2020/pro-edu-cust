/** @apiName 企业实训报告 */
import Vue from 'vue'

const selt = Vue.prototype

// 选择模板
export function getListEvaluate(params) {
  return selt.request({
    url: '/order/evaluateTpl/getListEvaluate',
    method: 'get',
    params
  })
}
// 获取模板信息
export function getInfo(id) {
  return selt.request({
    url: `/order/evaluateTpl/getInfo/${id}`,
    method: 'get'
  })
}
// 新建模板
export function saveOrgEvaluate(data) {
  return selt.request({
    url: `/order/evaluate/saveOrgEvaluate`,
    method: 'post',
    data
  })
}
// 报告详情
export function evaluateInfo(params) {
  return selt.request({
    url: `/order/evaluate/evaluateInfo`,
    method: 'get',
    params
  })
}
