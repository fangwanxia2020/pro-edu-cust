const getters = {
  sidebar: (state) => state.app.sidebar,
  token: (state) => state.user.token,
  device: (state) => state.app.device,
  userId: (state) => state.user.userId,
  userInfo: (state) => state.user.userInfo,
  permission_routes: (state) => state.permission.routes,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  permissions: (state) => state.user.permissions,
  menuState: (state) => state.chemicalInfo.menuState,
  msgCount: (state) => state.user.msgCount,
  visibleConfiguredMenus: (state) => state.user.visibleConfiguredMenus,
  sysConfig: (state) => state.configuration.sysConfig
}

export default getters
