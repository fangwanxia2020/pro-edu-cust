/** @apiName 实训报告 */

import Vue from 'vue'

const selt = Vue.prototype
// 获取报告详情
export function trainingReport(classRelStudentId) {
  return selt.request({
    url: `/system/trainingReport/${classRelStudentId}`,
    method: 'get'
  })
}
// 获取培训内容
export function trainingContentId(id) {
  return selt.request({
    url: `/system/trainingContent/${trainingContentId}`,
    method: 'get'
  })
}
// 考试成绩
export function getScoreById(id) {
  return selt.request({
    url: `/system/score/getScoreById/${id}`,
    method: 'get'
  })
}
// 评价单位
export function studentEvaluateOrgList(params) {
  return selt.request({
    url: `/order/evaluate/studentEvaluateOrgList`,
    method: 'get',
    params
  })
}
// 评价模块详情
export function studentTrainingInfo(params) {
  return selt.request({
    url: `/order/evaluate/studentTrainingInfo`,
    method: 'get',
    params
  })
}
// 评价日期
export function studentEvaluateTimeList(params) {
  return selt.request({
    url: `/order/evaluate/studentEvaluateTimeList`,
    method: 'get',
    params
  })
}
