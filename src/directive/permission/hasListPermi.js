import store from '@/store'

/**
 * 列表权限指令，控制列表字段
 * @module v-hasListPermi
 */
export default {
  /**
   * 插入元素时触发
   * @param {Element} el 指令所绑定的元素，可以用来直接操作 DOM
   * @param {Object} binding
   * @param {Object} binding.value
   * @param {string} binding.value.permiFlag 权限标识(格式为 *:*:*)
   * @param {string} [binding.value.column='columns'] 表格列字段名
   * @param {import('vue').VNode} vnode 虚拟节点，api 参考 <https://github.com/vuejs/vue/blob/dev/src/core/vdom/vnode.js>
   */
  inserted(el, binding, vnode) {
    const { value } = binding;
    const all_permission = "*:*:*";
    const permissions = store.getters && store.getters.permissions;
    const { permiFlag, column = 'columns' } = value || {};
    const hasPermissions = permissions.some(permission => all_permission === permission);

    if (hasPermissions) return; // 拥有全部权限

    if (permiFlag && column) {
      const tableColumns = vnode.context.$data.columns;
      // 拿到权限标识的最后一级
      const listPermi = permissions.filter(item => {
        if (item.indexOf(permiFlag) == 0) {
          const arr = item.split(permiFlag);
          return arr[1];
        } else {
          return false;
        }
      }).map(item => item.split(permiFlag + ":")[1]);
      const newColumns = tableColumns.filter(col => listPermi.indexOf(col.prop) != -1);  // 权限最后一级匹配上的字段才能保留
      vnode.context.$data[column] = newColumns;  // 改变当前页面的某个 data 属性
    } else {
      throw new Error(`请设置操作权限标签值`);
    }
  }
}
