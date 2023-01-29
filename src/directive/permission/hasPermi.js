import store from '@/store'

/**
 * 按钮权限指令
 * @module v-hasPermi
 */
export default {
  /**
   * 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
   * @param {Element} el
   * @param {Object} binding
   * @param {string[]} binding.value 权限标识列表
   * @param {string} [binding.arg] 传给指令的参数，可选。例如 v-hasPermi:link 中，参数为 "link"
   */
  inserted(el, binding) {
    const { value, arg } = binding
    const all_permission = "*:*:*";
    const permissions = store.getters && store.getters.permissions

    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value
      // 遍历权限列表是否有相应的权限
      const hasPermissions = permissions.some(permission =>
        all_permission === permission ||
        permissionFlag.includes(permission)
      )

      if (hasPermissions) return

      el.parentNode && el.parentNode.removeChild(el)

      if (arg === 'link') {  // 用于禁用列表中的查看链接
        el.parentNode.textContent = el.textContent
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
}
