import * as VueRouter from 'vue-router';

// 路由规则数组
const routes = [{
  path: '/',
  redirect: '/WindowMain/Chat',
}, {
  path: '/WindowMain',
  component: () => import('../window/WindowMain.vue'),
  children: [{
    path: 'Chat',
    component: () => import('../window/WindowMain/chat/index.vue'),
  }, {
    path: 'Contact',
    component: () => import('../window/WindowMain/Contact.vue'),
  }, {
    path: 'Collection',
    component: () => import('../window/WindowMain/Collection.vue'),
  },]
}, {
  path: '/WindowSetting',
  component: () => import('../window/WindowSetting.vue'),
  children: [
    {
      path: 'AccountSetting',
      component: () => import('../window/WindowSetting/AccountSetting.vue'),
    }
  ]
}, {
  path: '/WindowUserInfo',
  component: () => import('../window/WindowUserInfo.vue'),
}]

export let router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});
