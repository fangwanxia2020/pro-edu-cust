import { TEMPLATE_TYPE } from '@/utils/dict-enum'
import { getJsonByTemplateId } from '@/api/abilieManagement/companyAbilie'

const state = {
  templateObj: {}
}

const mutations = {
  SET_TEMPLATE_ITEM: (state, { key, value }) => {
    state.templateObj[key] = value
  }
}

const actions = {
  async getTemplateId({ state, commit }, { templateIds, type }) {
    let templateId = ''
    if (templateIds && templateIds.length > 0) {
      let templateObj = state.templateObj
      let hadIdList = templateIds.filter(function (val) {
        return templateObj[val] && templateObj[val] === type
      })
      if (hadIdList.length > 0) {
        templateId = hadIdList[0]
      } else {
        for (let i = 0; i < templateIds.length; i++) {
          let idItem = templateIds[i]
          // eslint-disable-next-line no-await-in-loop
          let res = await getJsonByTemplateId(idItem)
          if (res.code === 200) {
            if (res.data && res.data.templateType == TEMPLATE_TYPE[type]) {
              templateId = idItem
              commit('SET_TEMPLATE_ITEM', { key: idItem, value: type })
              break
            } else {
              const value = Object.keys(TEMPLATE_TYPE).find((key) => {
                return TEMPLATE_TYPE[key] == res.data.templateType
              })
              commit('SET_TEMPLATE_ITEM', { key: idItem, value })
            }
          }
        }
      }
    }
    return templateId
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
