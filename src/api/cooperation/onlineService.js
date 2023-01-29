import Vue from 'vue'

const selt = Vue.prototype

// 已接待会话列表
export function getKfRelationList(data) {
  return selt.request({
    url: '/basic/kefu/kfRelation/getKfRelationList',
    method: 'get',
    params: data
  })
}

// 客户会话列表
export function getCommonTalkList(data) {
  return selt.request({
    url: '/basic/api/message/kfTalk/getCommonTalkList',
    method: 'post',
    data
  })
}

// 新增客服消息
export function addKfMsgLog(data) {
  return selt.request({
    url: '/basic/kefu/kfMsgLog/addKfMsgLog',
    method: 'post',
    data
  })
}

// 聊天记录
export function getKfMsgLogList(data) {
  return selt.request({
    url: '/basic/kefu/kfMsgLog/alterKfMsgLogList',
    method: 'get',
    params: data
  })
}

// 常用语列表
export function getKfPhraseList(data) {
  return selt.request({
    url: '/basic/kefu/kfPhraseCategory/getKfPhraseCateOryByInfo',
    method: 'post',
    data
  })
}

// 修改聊天记录
export function modifyKfMsgLog(data) {
  return selt.request({
    url: '/basic/kefu/kfMsgLog/modifyKfMsgLog',
    method: 'post',
    data
  })
}
