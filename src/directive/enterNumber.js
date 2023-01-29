/**
 * 判断输入的数值
 * @module v-enterNumber
 */
export default {
  bind(el, { value = 2 }) {
    el = el.name == "INPUT" ? el : el.children[0]
    var RegStr = value == 0 ? `^[\\+\\-]?\\d+\\d{0,0}` : `^[\\+\\-]?\\d+\\.?\\d{0,${value}}`
    if (el) {
      el.addEventListener('keyup', () => {
        el.value = el.value.match(new RegExp(RegStr,'g'))
        el.dispatchEvent(new Event('input'))
      })
    }
  }
}
