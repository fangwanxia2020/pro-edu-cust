/** @apiName 专业共建 */
import Vue from 'vue'

const selt = Vue.prototype

export function list(params) {
  return selt.request({
    url: '/system/demand/list',
    method: 'get',
    params
  })
}

export function editPeCooperationDemand(data) {
  return selt.request({
    url: '/system/demand/editPeCooperationDemand',
    method: 'post',
    data
  })
}

export function addPeCooperationDemand(data) {
  return selt.request({
    url: '/system/demand/addPeCooperationDemand',
    method: 'post',
    data
  })
}

export function deletePeCooperationDemand(cooperationDemandIds) {
  return selt.request({
    url: `/system/demand/removeByIds/${cooperationDemandIds}`,
    method: 'post'
  })
}

export function getPeCooperationDemandDetails(cooperationDemandId) {
  return selt.request({
    url: `/system/demand/${cooperationDemandId}`,
    method: 'get'
  })
}

export function editTagValue(data) {
  return selt.request({
    url: '/system/objRelTag/editTagValue',
    method: 'post',
    data
  })
}

export function getTagsDetails(query) {
  return selt.request({
    url: '/system/objRelTag/demandTagValueList',
    method: 'get',
    params: query
  })
}
