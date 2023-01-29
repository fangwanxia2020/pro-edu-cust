/** @apiName 老师列表 */
import Vue from 'vue'

const selt = Vue.prototype

export function list(data) {
  return selt.request({
    url: '/system/classRelTeacher/listNoPage',
    method: 'POST',
    data
  })
}

export function getDet(id) {
  return selt.request({
    url: `/system/schoolClass/getById/${id}`,
    method: 'get'
  })
}

export function add(data) {
  return selt.request({
    url: `/system/classRelTeacher/add`,
    method: 'POST',
    data
  })
}

export function edit(data) {
  return selt.request({
    url: `/system/classRelTeacher/edit`,
    method: 'POST',
    data
  })
}

export function teacherDet(id) {
  return selt.request({
    url: `/system/classRelTeacher/getById/${id}`,
    method: 'GET'
  })
}

export function removeByIds(ids) {
  return selt.request({
    url: `/system/classRelTeacher/removeByIds/${ids}`,
    method: 'POST'
  })
}

export function editHeadTeacher(data) {
  return selt.request({
    url: `/system/classRelTeacher/editHeadTeacher`,
    method: 'POST',
    data
  })
}
