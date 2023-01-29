export function getGoodsIds(list) {
  const ids = list.map((item) => {
    return item.goodsId
  })
  const _ids = ids.join(',')
  return _ids
}

// 商品重新审核弹窗
export const reCheckGoods = function (that) {
  return new Promise((resolve) => {
    that
      .$confirm('信息保存后，商品需要平台重新审核，是否确认保存?', '保存', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        resolve(false)
      })
  })
}
