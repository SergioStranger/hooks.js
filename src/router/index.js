import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
  },
  {
    path: '/config',
    name: 'config',
    component: () => import(/* webpackChunkName: "config" */ '@/views/ConfigView.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "error 404" */ '@/views/NotFoundView.vue')
  },
  { path: '/:notFound(.*)', redirect: '/404'},
  {
    path: '/search/:id',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/SearchView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
