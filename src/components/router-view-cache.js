import { mapGetters } from 'vuex'
/**
 * 用于兼容三级以上的菜单显示的可兼容缓存的空 router-view 组件，实现递归嵌套路由组件，只需要缓存最后一级的组件名就可以了
 * @module components/router-view-cache
 */

/**
 * @param {string} name 组件 name 属性
 * @returns {import("vue").ComponentOptions}
 */
const createComponent = (name = 'RouterViewCache') => ({
  name,
  computed: {
    ...mapGetters(['cachedViews'])
  },
  render() {
    return (
      <KeepAlive include={this.cachedViews}>
        {/* 由于设置微前端原因，不能设置 key */}
        <RouterView />
      </KeepAlive>
    )
  }
})

export default createComponent