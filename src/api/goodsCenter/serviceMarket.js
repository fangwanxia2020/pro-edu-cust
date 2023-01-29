/** @apiName 商品中心 */
import Vue from 'vue'

const selt = Vue.prototype

// 分类下拉列表
export function catalogList(data) {
  return selt.request({
    url: '/goods/catalog/selectList',
    method: 'post',
    data
  })
}

// 分类下拉列表
export function getCodeSerialNumber(data) {
  return selt.request({
    url: '/goods/goods/getCodeSerialNumber',
    method: 'post',
    data
  })
}

// 添加/修改规格与库存
export function modifyStock(data) {
  return selt.request({
    url: '/goods/goods/modifyStock',
    method: 'post',
    data
  })
}

// 查询价格库存信息
export function getStock(data) {
  return selt.request({
    url: '/goods/goods/getStock',
    method: 'post',
    data
  })
}

// 删除商品
export function removeGoodsByIds(goodsIds) {
  return selt.request({
    url: `/goods/goods/removeByIds/${goodsIds}`,
    method: 'post'
  })
}

// 上架商品
export function upGoods(goodsIds) {
  return selt.request({
    url: `/goods/goods/upGoods/${goodsIds}`,
    method: 'post'
  })
}

// 下架商品
export function downGoods(goodsIds) {
  return selt.request({
    url: `/goods/goods/downGoods/${goodsIds}`,
    method: 'post'
  })
}

// 添加/修改购买须知
export function saveGoodsColumn(data) {
  return selt.request({
    url: `/goods/goods/saveGoodsColumn`,
    method: 'post',
    data
  })
}

// 查询商品购买须知信息
export function getGoodsColumn(data) {
  return selt.request({
    url: `/goods/goods/getGoodsColumn`,
    method: 'post',
    data
  })
}

// 新增栏目
export function addTextTemplate(data) {
  return selt.request({
    url: `/goods/textTemplate/addTextTemplate`,
    method: 'post',
    data
  })
}

// 栏目详情
export function getTextTemplateInfoById(id) {
  return selt.request({
    url: `/goods/textTemplate/getInfoById/${id}`,
    method: 'get'
  })
}

// 获取销售目录下拉树列表
export function treeSelectCustom(data) {
  return selt.request({
    url: `/goods/saleCatalog/treeSelectCustom`,
    method: 'post',
    data
  })
}

// 提审/修改商品状态
export function updateGoodsStatus(data) {
  return selt.request({
    url: `/goods/goods/updateGoodsStatus`,
    method: 'post',
    data
  })
}

// 保存/编辑商品订单提交信息
export function modifyOrderSubmitInfo(data) {
  return selt.request({
    url: `/goods/orderSubmit/modifyOrderSubmitInfo`,
    method: 'post',
    data
  })
}

// 获取商品订单提交信息
export function getOrderSubmitInfo(goodsId) {
  return selt.request({
    url: `/goods/orderSubmit/getOrderSubmitInfo/${goodsId}`,
    method: 'post'
  })
}
