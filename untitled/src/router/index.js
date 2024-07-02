import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Product.vue')
    },
    {
      path: '/edit',
      name: 'edit_product',
      component: () => import('../components/EditProduct.vue')
    },
    {
      path: '/add',
      name: 'add_product',
      component: () => import('../components/AddProduct.vue')
    },
    {
      path: '/type',
      name: 'type',
      component: () => import('../components/Type.vue')
    },
    {
      path: '/status',
      name: 'status',
      component: () => import('../components/Status.vue')
    },
    {
      path: '/status/add',
      name: 'add_status',
      component: () => import('../components/AddStatus.vue')
    },
    {
      path: '/status/edit',
      name: 'edit_status',
      component: () => import('../components/EditStatus.vue')
    },

    {
      path: '/type/add',
      name: 'add_type',
      component: () => import('../components/AddType.vue')
    },
    {
      path: '/type/edit',
      name: 'edit_type',
      component: () => import('../components/EditType.vue')
    }
  ]
})

export default router
