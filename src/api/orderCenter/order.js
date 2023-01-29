/** @apiName 采购订单(卖方) */
import Vue from 'vue'

const selt = Vue.prototype
// 卖方列表数据
export function list(params) {
  return selt.request({
    url: '/order/order/sellList',
    method: 'get',
    params
  })
}
// 卖方列表数据
export function buyList(params) {
  return selt.request({
    url: '/order/order/buyList',
    method: 'get',
    params
  })
}
// 订单详情
export function listDetail(orderId) {
  return selt.request({
    url: `/order/order/${orderId}`,
    method: 'get'
  })
}
// 订单详情-来源订单
export function listNumDetail(orderNum) {
  return selt.request({
    url: `/order/order/getInfoByOrderNo/${orderNum}`,
    method: 'get'
  })
}

// 取消订单
export function cancelOrder(orderId) {
  return selt.request({
    url: `/order/order/cancel/${orderId}`,
    method: 'POST'
  })
}
// c端列表
export function listPort(params) {
  return selt.request({
    url: `/order/order/list`,
    method: 'get',
    params
  })
}
// c端订单详情
export function portDetail(orderId) {
  return selt.request({
    url: `/order/order/${orderId}`,
    method: 'get'
  })
}
// 关闭c端订单
export function cancelOrderPort(orderId) {
  return selt.request({
    url: `/order/order/cancel/${orderId}`,
    method: 'POST'
  })
}
// c端备注
export function editOrder(data) {
  return selt.request({
    url: `/order/order/editOrder`,
    method: 'POST',
    data
  })
}
// 售后订单列表
export function refundApplyList(data) {
  return selt.request({
    url: `/order/refundApply/refundApplyList`,
    method: 'POST',
    data
  })
}
// 售后订单退款审核
export function orderRefundAduit(data) {
  return selt.request({
    url: `/order/refundApply/orderRefundAduit`,
    method: 'POST',
    data
  })
}
// 退款退货详情
export function getRefundApply(refundApplyId) {
  return selt.request({
    url: `/order/refundApply/${refundApplyId}`,
    method: 'get'
  })
}
