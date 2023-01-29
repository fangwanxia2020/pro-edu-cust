export function getGoodsIds(list) {
  const ids = list.map((item) => {
    return item.goodsId
  })
  const _ids = ids.join(',')
  return _ids
}
