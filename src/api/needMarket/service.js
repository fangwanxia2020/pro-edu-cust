/** @apiName 企业服务市场 */
import Vue from 'vue'

const selt = Vue.prototype

// 项目列表管理(免权)
export function marketList(params) {
  return selt.request({
    url: '/goods/free/goods/marketList',
    // url: '/goods/goods/marketList',
    method: 'get',
    params
  })
}

// 新增销售订单
export function addOrder(data) {
  return selt.request({
    url: '/order/order/addOrder',
    method: 'post',
    data
  })
}

// 获取订单详细信息
export function orderDetail(orderId) {
  return selt.request({
    url: `/order/order/${orderId}`,
    method: 'get'
  })
}

// 授信支付
export function creditPay(data) {
  return selt.request({
    url: '/order/order/creditPay',
    method: 'post',
    data
  })
}
// 微信支付
export function weixinPay(data) {
  return selt.request({
    url: '/order/weixin/settleContractPayOrder',
    method: 'post',
    data
  })
}
// 获取微信支付的payOrderNo
export function generateCodeBySaas(params) {
  return selt.request({
    url: '/basic/system/codeRule/generateCodeBySaas',
    method: 'get',
    params
  })
}

// 获取商品详细信息
export function getGoodsPreView(params) {
  return selt.request({
    // url: `/goods/goods/getGoodsPreView`,
    url: `/goods/free/goods/getGoodsPreView`,
    method: 'get',
    params
  })
}

// 获取分类
export function saleCatalog(id) {
  return selt.request({
    url: `/goods/saleCatalog/getById/${id}`,
    method: 'get'
  })
}
