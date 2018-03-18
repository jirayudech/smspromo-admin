import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

Vue.use(Router)

const routerOptions = [
  {
    path: '/adduser',
    component: 'AddUser',
    meta: { requiresAuth: true, title: 'Add User' }
  },
  {
    path: '/signin',
    component: 'SignIn'
  },
  {
    path: '/companies',
    component: 'Companies',
    meta: { requiresAuth: true, title: 'Companies' }
  },
  {
    path: '/brands',
    component: 'Brands',
    meta: { requiresAuth: true, title: 'Brands' }
  },
  {
    path: '/',
    component: 'CampaignsAdmin',
    meta: { requiresAuth: true, title: 'Campaigns Admin' }
  },
  {
    path: '/campaigns',
    component: 'Campaigns',
    meta: { requiresAuth: true, title: 'Campaigns' }
  },
  {
    path: '/campaign',
    component: 'Campaign',
    meta: { requiresAuth: true, title: 'Campaign' }
  },
  {
    path: '/clients',
    component: 'Clients',
    meta: { requiresAuth: true, title: 'Clients' }
  },
  {
    path: '/users',
    component: 'Users',
    meta: { requiresAuth: true, title: 'Users' }
  }
]

const routes = routerOptions.map(route => {
  return {
    path: route.path,
    component: () => import (`@/components/${route.component}.vue`),
    meta: route.meta
  }
})

const router = new Router({
  mode: 'history',
  routes: [
    ...routes, {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  const requiresAuth = to
    .matched
    .some(record => record.meta.requiresAuth)
  const user = firebase
    .auth()
    .currentUser
  if (requiresAuth && !user) {
    next('/signin')
  }
  if (to == '/' && user.email != 'jirawallet@gmail.com'){
    next('/campaigns')
  }
  next()
})

export default router