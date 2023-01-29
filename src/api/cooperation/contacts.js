/** @apiName 协同联系人 */
import Vue from 'vue'

const selt = Vue.prototype

// 列表
export function removeByIds(projectParticipantIds) {
  return selt.request({
    url: `/system/projectParticipant/removeByIds/${projectParticipantIds}`,
    method: 'post'
  })
}

export function getDetails(projectParticipantId) {
  return selt.request({
    url: `/system/projectParticipant/${projectParticipantId}`,
    method: 'get'
  })
}

export function addProjectParticipant(data) {
  return selt.request({
    url: '/system/projectParticipant/addProjectParticipant',
    method: 'post',
    data
  })
}

export function editProjectParticipant(data) {
  return selt.request({
    url: '/system/projectParticipant/editProjectParticipant',
    method: 'post',
    data
  })
}

export function getPower(projectParticipantId) {
  return selt.request({
    url: `/system/free/projectParticipant/${projectParticipantId}`,
    method: 'get'
  })
}

export function getUserByPhone(phone) {
  return selt.request({
    url: `/system/free/projectParticipant/getUserByPhone/${phone}`,
    method: 'get'
  })
}

export function editProjectParticipantStatus(data) {
  return selt.request({
    url: `/system/free/projectParticipant/editProjectParticipantStatus`,
    method: 'POST',
    data
  })
}
