import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '@/views/SignupView.vue'
import AddPostView from '@/views/AddPostView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/add',
    name: 'add',
    component: AddPostView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
