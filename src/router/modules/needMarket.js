/**
 * 供需市场
 */
const routes = [
  {
    path: '/boards',
    component: () => import('@/layout'),
    // hidden: true,
    meta: {
      title: '专业共建看板'
    },
    redirect: '/boards',
    children: [
      {
        path: 'boards',
        component: () => import('@/views/boards'),
        name: 'boards',
        meta: {
          title: '专业共建看板',
          activeMenu: '/boards'
        }
      }
    ]
  },
  {
    path: '/market',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '供需市场'
    },
    redirect: '/needMarket/market',
    children: [
      {
        path: 'profession',
        component: () => import('@/views/needMarket/market/profession'),
        name: 'profession',
        meta: {
          title: '专业共建详情',
          activeMenu: '/needMarket/market'
        }
      },
      {
        path: 'sendIntention',
        component: () => import('@/views/needMarket/market/sendIntention'),
        name: 'sendIntention',
        meta: {
          title: '发送合作意向'
          // activeMenu: '/needMarket/market'
        }
      },
      {
        path: 'ability',
        component: () => import('@/views/needMarket/market/ability'),
        name: 'ability',
        meta: {
          title: '能力详情信息',
          activeMenu: '/needMarket/market'
        }
      },
      {
        path: 'successPage',
        component: () => import('@/views/needMarket/market/successPage'),
        name: 'SuccessPage',
        meta: {
          title: '操作成功',
          activeMenu: '/needMarket/market'
        }
      },
      {
        path: 'oneOnlineService',
        component: () => import('@/views/cooperation/onlineService/onlineService'),
        name: 'oneOnlineService',
        meta: {
          title: '客服会话',
          activeMenu: '/needMarket/market'
        }
      }
    ]
  },
  {
    path: '/service',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '企业服务市场'
    },
    redirect: '/needMarket/service',
    children: [
      {
        path: 'goodsDetail',
        component: () => import('@/views/needMarket/service/goodsDetail'),
        name: 'goodsDetail',
        meta: {
          title: '商品详情'
          // activeMenu: '/needMarket/service'
        }
      },
      // C端
      {
        path: 'goodsDetailC',
        component: () => import('@/views/needMarket/service/goodsDetailC'),
        name: 'goodsDetailC',
        meta: {
          title: '商品详情'
          // activeMenu: '/needMarket/service'
        }
      },
      {
        path: 'goodsOrder',
        component: () => import('@/views/needMarket/service/order'),
        name: 'goodsOrder',
        meta: {
          title: '订单详情',
          activeMenu: '/needMarket/service'
        }
      },
      {
        path: 'goodsPay',
        component: () => import('@/views/needMarket/service/pay'),
        name: 'goodsPay',
        meta: {
          title: '收银台',
          activeMenu: '/needMarket/service'
        }
      },
      {
        path: 'payLast',
        component: () => import('@/views/needMarket/service/payLast'),
        name: 'payLast',
        meta: {
          title: '收银台',
          activeMenu: '/needMarket/service'
        }
      },
      {
        path: 'paySuccess',
        component: () => import('@/views/needMarket/service/paySuccess'),
        name: 'paySuccess',
        meta: {
          title: '支付页',
          activeMenu: '/needMarket/paySuccess'
        }
      }
    ]
  }
]
export default routes
