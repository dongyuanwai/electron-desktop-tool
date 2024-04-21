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
      path: '/second', 
      component: () => import('../page/second/index.vue') 
    },
  ],
})

export default router