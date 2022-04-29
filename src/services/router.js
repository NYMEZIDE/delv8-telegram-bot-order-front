import { createRouter, createWebHistory } from 'vue-router'

const routes  = [
  {
    path: '/',
    name: 'peopleAmount',
    component: () => import('../views/PeopleAmount.vue'),
  },
  {
    path: '/food-type',
    name: 'foodType',
    component: () => import('../views/FoodType.vue'),
  },
  {
    path: '/order-amount',
    name: 'orderAmount',
    component: () => import('../views/OrderAmount.vue'),
  },
  {
    path: '/order-result',
    name: 'orderResult',
    component: () => import('../views/OrderResult.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/work/tg-bot/index.html/' : '/'),
  routes
})

export {
  router,
  routes,
}
