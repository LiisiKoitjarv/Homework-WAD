import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '@/views/SignupView.vue'
import AddPostView from '@/views/AddPostView.vue'
import PostView from '@/views/PostView.vue'
import ContactUs from '@/views/ContactUs.vue'
import LogInView from '@/views/LogInView.vue'
import store from '@/store'

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
  },
  {
    path: '/login',
    name: 'login',
    component: LogInView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if(
    (to.name === 'home' && (from.name === 'signup' || from.name === 'login')) && !isAuthenticated){
      next({name: 'login'}); //direct to login page
    }
  else if ((to.name === 'login' || to.name === 'signup') && isAuthenticated){
    next({name: 'home'});
  }
  else {
    next();
  }
  
});

export default router
