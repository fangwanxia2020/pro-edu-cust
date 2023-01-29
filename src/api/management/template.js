/*
 * @Author: hjm
 * @Date: 2022-10-31 14:25:25
 * @LastEditors: hjm
 * @LastEditTime: 2022-10-31 14:53:39
 * @Description: file content
 */
// import { get } from "core-js/core/dict";
import Vue from 'vue'

const selt = Vue.prototype

// 获取模板列表
export function getList(query) {
  return selt.request({
    // url: '/basic/configuration/list',
    url: `${process.env.VUE_APP_GETTPL_LIST_URI}`,
    method: 'get',
    params: query,
    dynamicConfig: JSON.parse(localStorage.getItem('configInfo'))
  })
}

// 新增模板配置管理 第一步
export function addTemplateConfiguration(data) {
  return selt.request({
    url: '/basic/configuration/addTemplateConfiguration',
    method: 'post',
    data
  })
}
// 模板查询
export function templateSelect(templateConfigurationId) {
  return selt.request({
    url: `${process.env.VUE_APP_GETTPL_URI}/${templateConfigurationId}`,
    // url: `/basic/configuration/${templateConfigurationId}`,
    method: 'get',
    dynamicConfig: JSON.parse(localStorage.getItem('configInfo'))
  })
}

// 删除模板配置管理
export function removeTemplate(templateConfigurationId) {
  return selt.request({
    url: `/basic/configuration/removeByIds/${templateConfigurationId}`,
    method: 'post'
  })
}
// 修改模板状态
export function editTemplateConfiguration(data) {
  return selt.request({
    url: '/basic/configuration/editTemplateConfiguration',
    method: 'post',
    data
  })
}
// 修改发布状态
export function updateStatus(data) {
  return selt.request({
    url: '/basic/configuration/updateStatus',
    method: 'post',
    data
  })
}

// 获取模板配置管理详细信息
export function configurationInfo(templateConfigurationId) {
  return selt.request({
    url: `${process.env.VUE_APP_GETTPL_URI}/${templateConfigurationId}`,
    method: 'get',
    dynamicConfig: JSON.parse(localStorage.getItem('configInfo'))
  })
}
