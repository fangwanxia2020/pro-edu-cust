/** @apiName 评价模板 */
import Vue from 'vue'

const selt = Vue.prototype

// 新增评价指标模板
export function addEvaluateTpl(data) {
  return selt.request({
    url: '/order/evaluateTpl/addEvaluateTpl',
    method: 'post',
    data
  })
}

// 编辑评价指标模板
export function editEvaluateTpl(data) {
  return selt.request({
    url: '/order/evaluateTpl/editEvaluateTpl',
    method: 'post',
    data
  })
}

// 根据ID获取详细信息
export function getEvaluateTplById(id) {
  return selt.request({
    url: `/order/evaluateTpl/getInfo/${id}`,
    method: 'get'
  })
}
