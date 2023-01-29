/**
 * 商品中心
 */
import { ADD, EDIT, DETAIL } from '@/constants'

const GOODS_ACTIVE_MENU = '/goodsCenter/goodsToB/205'
const GOODS_ACTIVE_MENU_TO_C = '/goodsCenter/goodsToC/246'
const routes = [
  {
    path: '/serviceMarket',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '企业服务市场'
    },
    redirect: GOODS_ACTIVE_MENU,
    children: [
      {
        path: `${ADD}`,
        component: () => import('@/views/goodsCenter/serviceMarket/add/index.vue'),
        name: 'AddGoods',
        hidden: true,
        meta: {
          title: '新建商品',
          activeMenu: GOODS_ACTIVE_MENU
        }
      },
      {
        path: `${EDIT}`,
        component: () => import('@/views/goodsCenter/serviceMarket/add/index.vue'),
        name: 'EditGoods',
        hidden: true,
        meta: {
          title: '修改商品',
          activeMenu: GOODS_ACTIVE_MENU
        }
      },
      {
        path: `${DETAIL}`,
        component: () => import('@/views/goodsCenter/serviceMarket/add/index.vue'),
        name: 'DetailGoods',
        hidden: true,
        meta: {
          title: '商品详情',
          activeMenu: GOODS_ACTIVE_MENU
        }
      },
      {
        path: 'goodsSpecAdd',
        component: () => import('@/views/goodsCenter/serviceMarket/goodsSpecAdd.vue'),
        name: 'GoodsSpecAdd',
        hidden: true,
        meta: {
          title: '修改商品规格',
          activeMenu: GOODS_ACTIVE_MENU
        }
      }
    ]
  },
  {
    path: '/serviceMarketToC',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '企业服务市场'
    },
    redirect: GOODS_ACTIVE_MENU_TO_C,
    children: [
      {
        path: `${ADD}`,
        component: () => import('@/views/goodsCenter/serviceMarketToC/add/index.vue'),
        name: 'AddGoodsToC',
        hidden: true,
        meta: {
          title: '新建商品',
          activeMenu: GOODS_ACTIVE_MENU_TO_C
        }
      },
      {
        path: `${EDIT}`,
        component: () => import('@/views/goodsCenter/serviceMarketToC/add/index.vue'),
        name: 'EditGoodsToC',
        hidden: true,
        meta: {
          title: '修改商品',
          activeMenu: GOODS_ACTIVE_MENU_TO_C
        }
      },
      {
        path: `${DETAIL}`,
        component: () => import('@/views/goodsCenter/serviceMarketToC/add/index.vue'),
        name: 'DetailGoodsToC',
        hidden: true,
        meta: {
          title: '商品详情',
          activeMenu: GOODS_ACTIVE_MENU_TO_C
        }
      },
      {
        path: 'goodsSpecAdd',
        component: () => import('@/views/goodsCenter/serviceMarketToC/goodsSpecAdd.vue'),
        name: 'GoodsSpecAddToC',
        hidden: true,
        meta: {
          title: '修改商品规格',
          activeMenu: GOODS_ACTIVE_MENU_TO_C
        }
      }
    ]
  }
]
export default routes
