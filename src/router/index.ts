import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  //  hash 模式。
  history: createWebHashHistory(),
  routes: [
    // 设置首页
    {
      path: '/',
      component: () => import('../page/first/index.vue')
    },
    { 
      path: '/componentsNav', // 组件导航页
      component: () => import('../page/componentsNav/index.vue') 
    },
  ],
})

export default router