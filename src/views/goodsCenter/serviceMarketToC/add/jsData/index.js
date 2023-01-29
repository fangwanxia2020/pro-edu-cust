export const tabBasePanes = [
  {
    label: '基础信息',
    name: '1',
    formAttrs: {
      is: 'goods-base',
      ref: 'goodsBase'
    }
  },
  {
    label: '价格库存',
    name: '2',
    formAttrs: {
      is: 'price-stock',
      ref: 'priceStock'
    }
  }
]

export const tabOhterPanes = [
  {
    label: '订单提交信息',
    code: 'haveOrderSubmitDel',
    formAttrs: {
      is: 'order-submit-info',
      ref: 'orderSubmitInfo'
    }
  },
  {
    label: '购买须知',
    code: 'haveBuyText',
    formAttrs: {
      is: 'buy-need-know',
      ref: 'buyNeedKnow'
    }
  }
]
