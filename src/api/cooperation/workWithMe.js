import Vue from 'vue'

const selt = Vue.prototype

export function projectMissionInfo(projectMissionId) {
  return selt.request({
    url: `/system/projectMission/${projectMissionId}`,
    method: 'get'
  })
}
export function projectMissionFreeInfo(projectMissionId) {
  return selt.request({
    url: `/system/free/projectMission/${projectMissionId}`,
    method: 'get'
  })
}

// 协同联系人
export function projectParticipant(data) {
  return selt.request({
    url: `/system/projectParticipant/list`,
    method: 'get',
    params: data
  })
}

export function getRecord(data) {
  return selt.request({
    url: '/system/remind/getInfo',
    method: 'post',
    data
  })
}

export function editProjectMission(data) {
  return selt.request({
    url: '/system/projectMission/editProjectMission',
    method: 'post',
    data
  })
}

export function addProjectMissionText(data) {
  return selt.request({
    url: '/system/projectMission/addProjectMissionText',
    method: 'post',
    data
  })
}

// 分享合作事项
export function shareProjectMission(data) {
  return selt.request({
    url: '/system/projectMission/shareProjectMission',
    method: 'post',
    data
  })
}
// 判断当前用户是否申请该任务
export function selectUserWhetherApplyTask(projectMissionId) {
  return selt.request({
    url: `/system/projectMissionRelParticipant/selectUserWhetherApplyTask/${projectMissionId}`,
    method: 'get'
  })
}

// 申请任务权限
export function applyingTaskRights(data) {
  return selt.request({
    url: '/system/projectMissionRelParticipant/applyingTaskRights',
    method: 'post',
    data
  })
}
