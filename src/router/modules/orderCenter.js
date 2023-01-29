/**
 * 订单中心
 */
const routes = [
  {
    path: '/purchaseOrder',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '采购订单'
    },
    redirect: '/orderCenter/purchaseOrder',
    children: [
      {
        path: 'details',
        component: () => import('@/views/orderCenter/purchaseOrder/orderDetails.vue'),
        name: 'orderDetails',
        meta: {
          title: '订单详情',
          activeMenu: '/orderCenter/purchaseOrder/details'
        }
      }
    ]
  },
  {
    path: '/cPortOrder',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: 'c端订单'
    },
    redirect: '/orderCenter/cPortOrder',
    children: [
      {
        path: 'cPortDetail',
        component: () => import('@/views/orderCenter/cPortOrder/cPortDetail.vue'),
        name: 'cPortDetail',
        meta: {
          title: 'c端订单详情',
          activeMenu: '/orderCenter/cPortOrder/cPortDetail'
        }
      }
    ]
  }
]

export default routes
