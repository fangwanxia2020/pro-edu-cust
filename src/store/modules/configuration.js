import { CONFIG_ID } from '@/constants/common'
import { configuration } from '@/api/common'

const state = {
  sysConfig: {}
}

const mutations = {
  SET_SYS_CONFIG: (state, value) => {
    state.sysConfig = value
  }
}

const actions = {
  async getConfiguration({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (JSON.stringify(state.sysConfig) === '{}') {
        configuration(CONFIG_ID)
          .then((res) => {
            if (res.code === 200) {
              commit('SET_SYS_CONFIG', res.data)
            }
            resolve()
          })
          .catch((err) => {
            resolve()
          })
      } else {
        resolve()
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
