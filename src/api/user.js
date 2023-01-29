// 用户管理----------
import Vue from 'vue'
import axios from 'axios'
import Clipper from '@/components/upload-img/clipper.js'
import { getToken } from 'ty-pc/lib/utils/auth'
import { APPID, APPSCRIPT, URL, GETTOKEN_URI } from '../../env'

const selt = Vue.prototype
export function login(data) {
  return selt.request({
    url: '/system/login',
    method: 'post',
    data
  })
}
export function getInfo() {
  return selt.request({
    url: '/system/getInfo',
    method: 'get'
  })
}
export function logout() {
  return selt.request({
    url: '/system/loginOut',
    method: 'get'
  })
}
export function getRouters() {
  return selt.request({
    url: '/system/getRouters',
    method: 'get'
  })
}

export function getAllRouters() {
  return selt.request({
    url: '/system/getAllRouters',
    method: 'get'
  })
}

// 根据tenantcode查询信息
export function getInfoByTenantcode(tenantCode) {
  return selt.request({
    url: `/system/tenant/getPersonalityInfo/${tenantCode}`,
    method: 'get'
  })
}

export function sendResetPhone(data) {
  return selt.request({
    url: '/system/sendResetPhone',
    method: 'post',
    data
  })
}
export function resetPassword(data) {
  return selt.request({
    url: '/system/resetPassword',
    method: 'post',
    data
  })
}

export function registerUser(data) {
  return selt.request({
    url: '/system/free/user/registerUser',
    method: 'post',
    data
  })
}
export function checkCaptcha(data) {
  return selt.request({
    url: '/system/checkCaptcha',
    method: 'post',
    data
  })
}

// 验证码
export function captchaImage() {
  return selt.request({
    url: `/basic/captchaImage`,
    method: 'get'
  })
}

// 裁剪图片
let clipper = ''
export const init = () => {
  // 初始化
  clipper = new Clipper()
}
init()

// 封装文件上传的方法
// 上传图片时，先判断是否为要求比例，不是先裁剪再上传，裁剪时图片过大时进行一定压缩，上传时大于2M不给上传
export const uploadFile = async (self, fileConfig, callback) => {
  // 默认的配置信息
  const fileConfigDefault = {
    fileType: 1, // 上传文件类型
    fileUseType: 5, // 文件使用类型
    uploadSize: 1, // 上传文件的个数
    uploadFileSize: 2 * 1024 * 1024, // 上传文件的大小
    aspectRatio: 1 // 上传图片时的裁剪比例，默认1,传16/9时，按16:9裁剪
  }

  const fileConfigInfo = { ...fileConfigDefault, ...fileConfig }
  if (fileConfigInfo.files == undefined) {
    // 提示
    self.$message.error(`请选择${fileConfigInfo.fileType != 1 ? '文件' : '图片'}!`)
    return
  }
  // 重新写一个表单上传的方法
  const formData = new FormData()
  // 1为图片，2为文件，3为导入商品专用zip，4位pdf文档
  formData.append('fileType', fileConfigInfo.fileType)
  // 1为头像2产品图片3空间动态4销售品图片5公用,还有其他
  formData.append('fileUseType', fileConfigInfo.fileUseType)
  // 任务模板导入--项目订单id
  if (fileConfigInfo.orderProjectId && fileConfigInfo.type == 'taskImport') {
    formData.append('orderProjectId', fileConfigInfo.orderProjectId)
  }
  const files = fileConfigInfo.files

  let uploadUrl = null
  if (fileConfigInfo.fileType == 3) {
    uploadUrl = `${process.env.VUE_APP_BASE_API}/goods/api/goods/goods/importGoods`
  } else if (fileConfigInfo.fileType == 2) {
    if (fileConfigInfo.type == 'taskImport') {
      // 任务模板导入
      uploadUrl = `${process.env.VUE_APP_BASE_API}/order/api/order/actExecuteItem/resolveExcel`
    } else {
      uploadUrl = `${process.env.VUE_APP_BASE_API}/order/api/order/newOrder/uploadExcelToUserList`
    }
  } else if (fileConfigInfo.fileType == 6) {
    // 导入资源模板
    uploadUrl = `${process.env.VUE_APP_BASE_API}/goods/api/resource/resResource/importResource`
  } else {
    uploadUrl = `${process.env.VUE_APP_BASE_API}/file/file/upload`
  }
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: getToken()
    }
  }

  if (fileConfigInfo.fileType == 1) {
    if (files.type.indexOf('image') == -1) {
      // 提示，选择的图片的格式超过限制
      self.$message.error('选择文件非图片格式!')
      callback()
      return
    }
    // console.log(fileConfigInfo.aspectRatio)
    if (
      Object.prototype.toString.call(fileConfigInfo.aspectRatio) == '[object Boolean]' &&
      fileConfigInfo.aspectRatio == false
    ) {
      if (files.size > fileConfigInfo.uploadFileSize) {
        // 提示，选择的图片的大小超过限制
        self.$message.error('上传图片大小最大为 2M !')
        callback()
        return
      }
      formData.append('file', files, files.name)
    } else if (isNaN(fileConfigInfo.aspectRatio)) {
      clipper.clip(files, {
        aspectRatio: fileConfigInfo.aspectRatio
      })
      // 回调函数
      clipper.confirm(function (file, $this) {
        // return Promise.resolve();
        if (file.size > fileConfigInfo.uploadFileSize) {
          // 提示，选择的图片的大小超过限制
          $this.$message.error('上传图片大小最大为 2M !')
          // callback()
          return Promise.reject()
        }
        formData.append('file', file, file.name)
        return axios
          .post(uploadUrl, formData, config)
          .then(function (data) {
            const info = data.data
            if (info.code == '200') {
              // console.log(info)
              callback.call($this, info)
            } else {
              callback.call($this, info)
            }
          })
          .catch(function (error) {
            $this.$message({
              showClose: true,
              message: error,
              type: 'error'
            })
          })
      }, self)
      return
    } else {
      let reader = new FileReader()
      reader.onload = function (e) {
        let data = e.target.result
        // 加载图片获取图片真实宽度和高度，异步操作
        let image = new Image()
        image.onload = function () {
          let width = image.width
          let height = image.height
          // （宽度/高度-比例）绝对值大于0.1时进行裁剪
          /* console.log('宽度/高度'+(width/height))
          console.log('裁剪比例'+fileConfigInfo.aspectRatio)
          console.log((width/height)-fileConfigInfo.aspectRatio)
          console.log(Math.abs((width/height)-fileConfigInfo.aspectRatio) > 0.1) */
          if (Math.abs(width / height - fileConfigInfo.aspectRatio) > 0.1) {
            // 不满足比例，需进行裁剪
            clipper.clip(files, {
              aspectRatio: fileConfigInfo.aspectRatio
            })
            // 回调函数
            clipper.confirm(function (file, $this) {
              // return Promise.resolve();
              if (file.size > fileConfigInfo.uploadFileSize) {
                // 提示，选择的图片的大小超过限制
                $this.$message.error('上传图片大小最大为 2M !')
                // callback()
                return Promise.reject()
              }
              formData.append('file', file, file.name)
              return axios
                .post(uploadUrl, formData, config)
                .then(function (data) {
                  const info = data.data
                  if (info.code == '200') {
                    // console.log(info)
                    callback.call($this, info)
                  } else {
                    callback.call($this, info)
                  }
                })
                .catch(function (error) {
                  $this.$message({
                    showClose: true,
                    message: error,
                    type: 'error'
                  })
                })
            }, self)
          } else {
            if (files.size > fileConfigInfo.uploadFileSize) {
              // 提示，选择的图片的大小超过限制
              self.$message.error('上传图片大小最大为 2M !')
              callback()
              return
            }
            formData.append('file', files, files.name)

            axios
              .post(uploadUrl, formData, config)
              .then(function (data) {
                const info = data.data
                if (info.code == '200') {
                  callback.call(self, info)
                } else {
                  callback.call(self, info)
                }
              })
              .catch(function (error) {
                self.$message({
                  showClose: true,
                  message: error,
                  type: 'error'
                })
              })
          }
        }
        image.src = data
      }
      reader.readAsDataURL(files)
      // 图片先进行裁剪
      return
    }
  } else if (fileConfigInfo.fileType == 2) {
    let flag = false
    if (files.name.indexOf('xlsx') != -1) {
      flag = true
    } else if (files.name.indexOf('xls') != -1) {
      flag = true
    } else if (files.name.indexOf('xlt') != -1) {
      flag = true
    } else if (files.name.indexOf('xla') != -1) {
      flag = true
    } else if (files.name.indexOf('xltx') != -1) {
      flag = true
    } else if (files.name.indexOf('xlsm') != -1) {
      flag = true
    } else if (files.name.indexOf('xltm') != -1) {
      flag = true
    } else if (files.name.indexOf('xlam') != -1) {
      flag = true
    } else if (files.name.indexOf('xlsb') != -1) {
      flag = true
    }

    if (flag) {
      formData.append('file', files, files.name)
    } else {
      self.$message.error('请选择excel文件格式！')
      callback()
    }
  } else if (fileConfigInfo.fileType == 3) {
    if (files.type.indexOf('zip') == -1) {
      self.$message.error('选择文件非zip格式!')
      callback()
      return
    }
    formData.append('zipFile', files, files.name)
  } else if (fileConfigInfo.fileType == 5) {
    if (files.type.indexOf('pdf') == -1) {
      self.$message.error('选择文件非PDF文档格式!')
      callback()
      return
    }
    formData.append('file', files, files.name)
  } else {
    formData.append('file', files, files.name)
  }
  axios
    .post(uploadUrl, formData, config)
    .then(function (data) {
      const info = data.data
      if (info.code == '200') {
        callback.call(self, info)
      } else {
        callback.call(self, info)
      }
    })
    .catch(function (error) {
      // self.$message({ 上传成功也报错，注释了
      //     showClose: true,
      //     message: error,
      //     type: 'error'
      // });
    })
}

// 获取配置系统token
export function getConfigToken() {
  return selt.request({
    url: GETTOKEN_URI,
    method: 'post',
    data: {
      appId: APPID,
      appScript: APPSCRIPT
    },
    dynamicConfig: {
      url: URL
    }
  })
}
