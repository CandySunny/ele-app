import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Index',
    component: Index,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/order',
        component: () => import('../views/Order.vue')
      },
      {
        path: '/me',
        component: () => import('../views/Me.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// beforeEach注册全局守卫
router.beforeEach((to, from, next) => {
  // 通过localStorage获取当前登录状态
  const isLogin = JSON.parse(localStorage.isLogin);
  console.log('isLogin:', isLogin)
  // console.log('to.path:', to.path)

  if (to.path === '/login') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
