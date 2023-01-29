import { login, logout, getInfo, getConfigToken } from '@/api/user'
import { getToken, setToken, removeToken } from 'ty-pc/lib/utils/auth'
import { resetRouter } from '@/router'
import { countUnReadAmount } from '@/api/system/information'

const state = {
  userId: '',
  token: getToken(),
  permissions: [],
  userInfo: {},
  msgCount: 0,
  visibleConfiguredMenus: null // 当前用户配置了的可见菜单
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERID: (state, id) => {
    state.userId = id
  },
  SET_USER: (state, data) => {
    state.userInfo = data
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_VISIBLE_CONFIGURED_MENUS(state, payload) {
    state.visibleConfiguredMenus = payload
  },
  SET_MSGCOUNT: (state, msgCount) => {
    state.msgCount = msgCount
  }
}

const actions = {
  // 登录
  login({ commit }, loginForm) {
    return new Promise((resolve, reject) => {
      if (loginForm.token != null && loginForm.token != undefined) {
        commit('SET_TOKEN', loginForm.token)
        setToken(loginForm.token)
        resolve()
      } else {
        login(loginForm)
          .then((response) => {
            const { token } = response
            commit('SET_TOKEN', token)
            setToken(token)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      }
    })
  },
  // 获取用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo({})
        .then((response) => {
          localStorage.setItem('orgId', response.user.orgId)
          const sysuuid = response
          // if (!sysuuid) {
          //   reject('获取用户信息失败！')
          // }
          commit('SET_USERID', sysuuid.user.userId)
          commit('SET_USER', response.user)
          commit('SET_PERMISSIONS', response.permissions)
          commit('SET_TOKEN', getToken())
          resolve(sysuuid)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 获取配置系统token
  getConfigToken({ commit }) {
    return new Promise((resolve, reject) => {
      getConfigToken().then((response) => {
        if (response.data) {
          const configInfo = {
            url: process.env.VUE_APP_CONFIG_URL,
            apiToken: response.data,
            prefixUri: process.env.VUE_APP_PREFIX_URI
          }
          localStorage.setItem('configInfo', JSON.stringify(configInfo))
        }
      })
      resolve()
    })
  },

  // 注销
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_USERID', '')
          commit('SET_PERMISSIONS', [])
          commit('SET_VISIBLE_CONFIGURED_MENUS', null)
          removeToken()
          resetRouter()
          dispatch('tagsView/delAllViews', null, {
            root: true
          })
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  /** 设置当前用户配置的可见菜单 */
  setVisibleConfiguredMenus({ commit }, payload) {
    commit('SET_VISIBLE_CONFIGURED_MENUS', payload)
  },
  // 获取未读信息数
  getMsgCount({ commit }) {
    return new Promise((resolve) => {
      countUnReadAmount().then((res) => {
        const { data } = res
        commit('SET_MSGCOUNT', data)
        resolve()
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
