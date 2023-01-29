import Vue from 'vue'

const selt = Vue.prototype
export function list(query) {
  return selt.request({
    url: '/basic/operLog/list',
    method: 'get',
    params: query
  })
}

export function delOperlog(operIds) {
  return selt.request({
    url: `/basic/operLog/removeByIds/${operIds}`,
    method: 'post'
  })
}
