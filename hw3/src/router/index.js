import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '@/views/SignupView.vue'
import AddPostView from '@/views/AddPostView.vue'
import PostView from '@/views/PostView.vue'
import ContactUs from '@/views/ContactUs.vue'

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
  },
  {
    path: '/post/:id',
    name: 'post',
    component: PostView,
    props: true
  },
  {
    path: '/contact',         
    name: 'contact',
    component: ContactUs
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
