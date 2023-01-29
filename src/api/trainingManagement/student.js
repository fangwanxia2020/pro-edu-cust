/** @apiName 学生列表 */
import Vue from 'vue'

const selt = Vue.prototype

export function list(params) {
  return selt.request({
    url: '/system/classRelStudent/list',
    method: 'get',
    params
  })
}

export function addClassRelStudent(data) {
  return selt.request({
    url: '/system/classRelStudent/addClassRelStudent',
    method: 'POST',
    data
  })
}

export function editClassRelStudent(data) {
  return selt.request({
    url: '/system/classRelStudent/editClassRelStudent',
    method: 'POST',
    data
  })
}

export function stdDetails(id) {
  return selt.request({
    url: `/system/classRelStudent/getById/${id}`,
    method: 'get'
  })
}

export function removeByIds(ids) {
  return selt.request({
    url: `/system/classRelStudent/removeByIds/${ids}`,
    method: 'post'
  })
}

export function getDet(id) {
  return selt.request({
    url: `/system/schoolClass/getById/${id}`,
    method: 'get'
  })
}
// 导入模板下载
export function downloadStudentTemplate(data) {
  return selt.request({
    url: '/system/classRelStudent/downloadStudentTemplate',
    method: 'POST',
    data
  })
}
// 批量导入学生
export function importData(classId) {
  return selt.request({
    url: `/system/classRelStudent/importData/${classId}`,
    method: 'POST'
  })
}
