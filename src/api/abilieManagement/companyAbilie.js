import Vue from 'vue'

const selt = Vue.prototype

// 获取列表数据
export function getAbilieList(data) {
  return selt.request({
    url: '/system/competence/list',
    method: 'get',
    params: data
  })
}

// 获取模板数据下拉
export function getTemplateList(data) {
  return selt.request({
    url: '/system/enterpriseTypeTemplate/list',
    method: 'get',
    params: data
  })
}

// 场景详情
export function sceneDetail(enterpriseTypeTemplateId) {
  return selt.request({
    url: `/system/enterpriseTypeTemplate/${enterpriseTypeTemplateId}`,
    method: 'get'
  })
}

// 能力详情
export function abilieDetail(enterpriseCompetenceId) {
  return selt.request({
    url: `/system/competence/${enterpriseCompetenceId}`,
    method: 'get'
  })
}

// 创建能力
export function addAbilie(data) {
  return selt.request({
    url: '/system/competence/addEnterpriseCompetence',
    method: 'post',
    data
  })
}

// 修改能力
export function editAbilie(data) {
  return selt.request({
    url: '/system/competence/editEnterpriseCompetence',
    method: 'post',
    data
  })
}

// 删除能力
export function delAbilie(data) {
  return selt.request({
    url: `/system/competence/removeByIds/${data}`,
    method: 'post',
    data
  })
}

// 获取模板
// export function getJsonByTemplateId(templateConfigurationId) {
//   return selt.request({
//     url: `/basic/configuration/${templateConfigurationId}`,
//     method: 'get'
//   })
// }
export function getJsonByTemplateId(templateConfigurationId) {
  return selt.request({
    url: `${process.env.VUE_APP_GETTPL_URI}/${templateConfigurationId}`,
    method: 'get',
    dynamicConfig: JSON.parse(localStorage.getItem('configInfo'))
  })
}
