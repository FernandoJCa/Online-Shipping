import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Shipping from '../views/Shipping.vue'
import MainMenu from '../views/MainMenu.vue'
import ShippingHistory from '../components/ShippingHistory.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/main-menu',
    name: 'MainMenu',
    component: MainMenu,
    meta: { requiresAuth: true }
  },
  {
    path: '/shipping',
    name: 'Shipping',
    component: Shipping,
    meta: { requiresAuth: true }
  },
  {
    path: '/history',
    name: 'ShippingHistory',
    component: ShippingHistory,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router