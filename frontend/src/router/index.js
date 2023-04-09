import { createRouter, createWebHistory } from 'vue-router'

import isAuthenticated from '@/auth';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import ProfileView from '../views/ProfileView.vue';
import ProductsView from '../views/ProductsView.vue';
import AddProductView from '../views/AddProductView.vue';
import EditProductView from '../views/EditProductView.vue';
import ProductDetailsView from '../views/ProductDetailsView.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: "login",
    component: LoginView
  },
  {
    path: '/signup',
    name: "signup",
    component: SignupView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {requiresAuth: true}
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView,
    meta: {requiresAuth: true}
  },
  {
    path: '/add-product',
    name: 'add-product',
    component: AddProductView,
    meta: {requiresAuth: true}
  },
  {
    path: '/edit-product/:slug',
    name: 'edit-product',
    component: EditProductView,
    meta: {requiresAuth: true}
  },
  {
    path: "/:slug",
    name: "product",
    component: ProductDetailsView,
    meta: {requiresAuth: true}

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ path: '/login', query: {redirect: to.fullPath} })
  }
  else {
    next();
  }
})

export default router
