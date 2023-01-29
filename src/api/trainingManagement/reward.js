/** @apiName 学生奖惩 */
import Vue from 'vue'

const selt = Vue.prototype
// 批量新增学生奖罚情况
export function addBatchStudentRelObj(data) {
  return selt.request({
    url: '/system/studentRelObj/addBatchStudentRelObj',
    method: 'post',
    data
  })
}

// 获取学生奖罚情况详细信息
export function studentRelObjDetail(studentRelObjId) {
  return selt.request({
    url: `/system/studentRelObj/${studentRelObjId}`,
    method: 'get'
  })
}
export function editStudentRelObj(data) {
  return selt.request({
    url: '/system/studentRelObj/editStudentRelObj',
    method: 'post',
    data
  })
}
