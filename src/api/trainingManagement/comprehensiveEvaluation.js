/** @apiName 学生综合评价 */
import Vue from 'vue'

const selt = Vue.prototype

// 班级列表
export function schoolClassList(data) {
  return selt.request({
    url: '/system/schoolClass/listPageByExpr',
    method: 'post',
    data
  })
}

// 学生列表
export function studentList(params) {
  return selt.request({
    url: '/order/evaluate/studentList',
    method: 'get',
    params
  })
}

// 学生/单位评价选择模板分页列表
export function getListEvaluate(params) {
  return selt.request({
    url: '/order/evaluateTpl/getListEvaluate',
    method: 'get',
    params
  })
}

// 获取详细信息
export function getTplInfo(id) {
  return selt.request({
    url: `/order/evaluateTpl/getInfo/${id}`,
    method: 'get'
  })
}

// 保存学生评价管理
export function saveStudentEvaluate(data) {
  return selt.request({
    url: '/order/evaluate/saveStudentEvaluate',
    method: 'post',
    data
  })
}

// 学生/单位评价详情
export function evaluateInfo(params) {
  return selt.request({
    url: '/order/evaluate/evaluateInfo',
    method: 'get',
    params
  })
}

// 学生综合评价-评价汇总
export function evaluateSummary(data) {
  return selt.request({
    url: '/order/evaluate/evaluateSummary',
    method: 'post',
    data
  })
}
