/**
 * 404 路由
 * @module router/404-not-found
 * @type {import("vue-router").RouteRecord}
 */
const route = {
  path: '*',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '',
      component: () => import('@/views/404.vue'),
      name: '404NotFound',
      meta: {
        title: '404页面'
      }
    }
  ],
  hidden: true
}

export default route
