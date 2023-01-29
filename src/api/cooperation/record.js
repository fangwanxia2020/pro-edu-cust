import Vue from 'vue'

const selt = Vue.prototype

export function getRecord(data) {
  return selt.request({
    url: '/system/remind/getInfo',
    method: 'post',
    data
  })
}

export function addPeFollowRemind(data) {
  return selt.request({
    url: '/system/remind/addPeFollowRemind',
    method: 'post',
    data
  })
}

export function getList(cooperativePurposeId) {
  return selt.request({
    url: `/system/purpose/${cooperativePurposeId}`,
    method: 'get'
  })
}

export function getDetails(followRemindId) {
  return selt.request({
    url: `/system/remind/${followRemindId}`,
    method: 'get'
  })
}

export function getNeed(recommendedEnterpriseRelId) {
  return selt.request({
    url: `/system/demandMatching/${recommendedEnterpriseRelId}`,
    method: 'get'
  })
}

export function editPeFollowRemind(data) {
  return selt.request({
    url: '/system/remind/editPeFollowRemind',
    method: 'post',
    data
  })
}

export function deletePeFollowRemind(followRemindIds) {
  return selt.request({
    url: `/system/remind/removeByIds/${followRemindIds}`,
    method: 'post'
  })
}

export function getAbility(recommendedEnterpriseRelId) {
  return selt.request({
    url: `/system/abilityMatching/${recommendedEnterpriseRelId}`,
    method: 'get'
  })
}
