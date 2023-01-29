import Vue from 'vue'

const selt = Vue.prototype

// 获取列表数据
export function getWorkList(query) {
  return selt.request({
    url: '/system/projectMissionRelParticipant/getProMissionRelPartByCreateIdAndStatus',
    method: 'get',
    params: query
  })
}

// 审核
export function toAudit(data) {
  return selt.request({
    url: '/system/projectMissionRelParticipant/auditProMissionRelParticipant',
    method: 'post',
    data
  })
}

// 修改权限
export function editAuth(data) {
  return selt.request({
    url: '/system/projectMissionRelParticipant/editProjectMissionRelParticipantVisitType',
    method: 'post',
    data
  })
}
