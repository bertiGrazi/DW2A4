import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '@/components/Cart.vue'
import AddToCart from '@/components/AddToCart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/addToCart/:id',
    name: 'AddToCart',
    component: AddToCart,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
