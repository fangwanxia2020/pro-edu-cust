/* eslint-disable no-useless-escape */
/**
 * 校验模块
 * @module utils/validate
 */

/** 校验正则对象 */
export const regMap = {
  // 邮箱
  email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,

  // 手机号码
  phone: /^1[3456789]\d{9}$/,

  // 电话号码
  telphone: /^0\d{2,3}-?\d{7,8}$/,

  // url
  url: /^http(s)?:\/\/(?!([\w-]+\.[\w-]+$))([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/,

  // 金钱 xx.xx
  money: /^((0)|([1-9]\d{0,8}))(\.(\d){0,2})?$/,

  // 时间字符串  yyyy-MM-dd
  time1: /^\d{4}-((0[\d])|(1[012]))-(([012][\d])|(30)|(31))$/,

  // 时间字符串  yyyy-MM-dd hh:mm:ss
  time2:
    /^\d{4}-((0[\d])|(1[012]))-(([012][\d])|(30)|(31))\s(([01][\d])|(2[0123])):([012345][\d]):([012345][\d])$/,

  // 不小于0的数
  moreZero: /^(((?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,})|0)$/,

  // 空格
  space: /^[ ]+$/
}

/** 正则校验函数对象 */
export const test = {
  // 邮箱
  email(str) {
    return regMap.email.test(str)
  },
  // 手机号
  phone(str) {
    return regMap.phone.test(str)
  },
  // 电话号码
  telphone(str) {
    return regMap.telphone.test(str)
  },
  // url
  url(str) {
    return regMap.url.test(str)
  },
  // 金额
  regMoney(str) {
    return regMap.money.test(str)
  },
  // 时间字符串 yyyy-MM-dd
  time1(str) {
    return regMap.time1.test(str)
  },
  // 时间字符串 yyyy-MM-dd hh:mm:ss
  time2(str) {
    return regMap.time2.test(str)
  },
  // 不小于0的数
  moreZero(str) {
    return regMap.moreZero.test(str)
  },
  // 空格
  space(str) {
    return regMap.space.test(str)
  }
}

/** JS 类型校验对象 */
export const type = {
  getTypeStr(value) {
    let typeStr = Object.prototype.toString.call(value)
    typeStr = typeStr.replace(/[\[\] ]|.*(?= )/g, '') // 只保留类型字符串
    return typeStr
  },

  // 判断字符串
  str(value) {
    return this.getTypeStr(value) === 'String'
  },

  // 判断数字
  num(value) {
    return this.getTypeStr(value) === 'Number'
  },

  // 判断数组
  arr(value) {
    return this.getTypeStr(value) === 'Array'
  },

  // 判断方法
  fun(value) {
    return this.getTypeStr(value) === 'Function'
  },

  // 判断布尔
  bool(value) {
    return this.getTypeStr(value) === 'Boolean'
  },

  // 判断对象
  obj(value) {
    return this.getTypeStr(value) === 'Object'
  },

  // 判断正则
  reg(value) {
    return this.getTypeStr(value) === 'RegExp'
  },

  // 判断 Symbol
  symol(value) {
    return this.getTypeStr(value) === 'Symbol'
  },

  // 判断 null
  null(value) {
    return this.getTypeStr(value) === 'Null'
  },

  // 判断 undefined
  undefined(value) {
    return this.getTypeStr(value) === 'Undefined'
  }
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
