import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import App from '../App.vue';
import Home from '../views/Home.vue';
import RouterTest from '../views/RouterTest.vue';

const routes = [
  {
    path: '/',
    component: App, // 一级路由不要写name属性
    children: [
      {
        path: '/home',
        redirect: '/'
      },
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: 'routertest',
        name: 'routertest',
        component: RouterTest
      }
    ]
  }
]

export default new Router({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y:0 }
  }
})