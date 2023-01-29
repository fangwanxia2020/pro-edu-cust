/** @apiName 培训内容 */
import Vue from 'vue'

const selt = Vue.prototype

export function list(params) {
  return selt.request({
    url: '/system/trainingContent/list',
    method: 'get',
    params
  })
}

export function getDet(id) {
  return selt.request({
    url: `/system/schoolClass/getById/${id}`,
    method: 'get'
  })
}

export function addTrainingContent(data) {
  return selt.request({
    url: `/system/trainingContent/addTrainingContent`,
    method: 'POST',
    data
  })
}

export function listNoPage(data) {
  return selt.request({
    url: '/system/classRelTeacher/listNoPage',
    method: 'POST',
    data
  })
}

export function editDet(trainingContentId) {
  return selt.request({
    url: `/system/trainingContent/${trainingContentId}`,
    method: 'get'
  })
}

export function editTrainingContent(data) {
  return selt.request({
    url: `/system/trainingContent/editTrainingContent`,
    method: 'post',
    data
  })
}

export function removeByIds(trainingContentIds) {
  return selt.request({
    url: `/system/trainingContent/removeByIds/${trainingContentIds}`,
    method: 'post'
  })
}
