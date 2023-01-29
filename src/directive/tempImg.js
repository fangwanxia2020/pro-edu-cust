/**
 * 检测图片是否存在
 * @param {string} url
 */
function imageIsExist(url) {
  return new Promise((resolve) => {
    let img = new Image()
    img.onload = function () {
      if (this.complete == true) {
        resolve(true)
        img = null
      }
    }
    img.onerror = function () {
      resolve(false)
      img = null
    }
    img.src = url
  })
}

/**
 * 用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用默认图片
 * @module v-tempImg
 */
export default {
  async inserted(el, binding) {
    const imgURL = binding.value // 获取图片地址
    if (imgURL) {
      let exist = await imageIsExist(imgURL)
      if (exist) {
        el.setAttribute('src',imgURL)
      }
    }
  }
}
