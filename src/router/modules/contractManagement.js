/**
 * 合同管理
 */
const routes = [
  {
    path: '/customerContracts',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '合同管理'
    },
    redirect: '/contractManagement/customerContracts',
    children: [
      {
        path: 'add',
        component: () => import('@/views/contractManagement/customerContracts/newContract/index'),
        name: 'newContract',
        meta: {
          title: '合同新增',
          activeMenu: '/contractManagement/customerContracts',
          cache: false
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/contractManagement/customerContracts/newContract/edit'),
        name: 'editContract',
        meta: {
          title: '合同编辑',
          activeMenu: '/contractManagement/customerContracts',
          cache: false
        }
      }
      // {
      //   path: 'details',
      //   component: () => import('@/views/basicInformationManage/vehicleManage/vehicle'),
      //   name: 'vehicleDetails',
      //   meta: {
      //     title: '车辆详情',
      //     activeMenu: '/basicInformationManage/vehicleManage'
      //   }
      // }
    ]
  },
  {
    path: '/purchaseContracts',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '采购合同'
    },
    redirect: '/contractManagement/purchaseContracts',
    children: [
      {
        path: 'add',
        component: () => import('@/views/contractManagement/purchaseContracts/newContract/index'),
        name: 'newPurchaseContract',
        meta: {
          title: '合同新增',
          activeMenu: '/contractManagement/purchaseContracts',
          cache: false
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/contractManagement/purchaseContracts/newContract/edit'),
        name: 'editPurchaseContract',
        meta: {
          title: '合同编辑',
          activeMenu: '/contractManagement/purchaseContracts',
          cache: false
        }
      }
    ]
  }
]

export default routes
