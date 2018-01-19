import Vue from 'vue'
import Router from 'vue-router'
//import SignUp from '@/components/SignUp'

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/signup',
//       name: 'SignUp',
//       component: SignUp
//     }
//   ]
// })


const routerOptions = [
  {
    path: '/signup',
    component: 'SignUp'
  },
  {
    path: '/signin',
    component: 'SignIn'
  },
  {
    path: '/',
    component: 'Campaigns'
  }
]

const routes = routerOptions.map(route => {
  return {
    path: route.path,
    component: () => import (`@/components/${route.component}.vue`)
  }
})

export default new Router({
  mode: 'history',
  routes
})