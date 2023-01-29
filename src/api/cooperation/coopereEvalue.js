import Vue from 'vue'

const selt = Vue.prototype

// 实施单位列表
export function getUnitList(data) {
  return selt.request({
    url: '/system/projectMissionRelParticipant/getCustomerAndPartnersNamelist',
    method: 'get',
    params: data
  })
}

// 评价
export function toEvalue(data) {
  return selt.request({
    url: '/system/evaluate/addEvaluateToProMission',
    method: 'post',
    data
  })
}
