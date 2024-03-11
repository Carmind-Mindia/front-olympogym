import MainView from '@/views/MainView.vue'
import AddUser from '@/views/mains/AddUser.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { mustBeLoggedOut, mustBeLogin } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/app'
    },
    {
      path: '/app',
      name: 'app',
      component: MainView,
      beforeEnter:[mustBeLogin],
      children:[
        {
          path: 'users',
          name: 'app.users',
          component: () => import('../views/mains/UsersView.vue'),
          beforeEnter:[mustBeLogin],
          children:[
            {
              path: 'add',
              name: 'app.users.add',
              component: AddUser,
              beforeEnter:[mustBeLogin],
            },
            {
              path: 'edit/:id',
              name: 'app.users.edit',
              component: AddUser,
              beforeEnter:[mustBeLogin],
            }
          ]
        },
        {
          path: 'memberships',
          name: 'app.membresias',
          component: () => import('../views/mains/MembershipsView.vue'),
          beforeEnter:[mustBeLogin],
          children:[
            {
              path: 'add',
              name: 'app.membresias.add',
              component: () => import('../views/mains/AddMembership.vue'),
              beforeEnter:[mustBeLogin],
            },
            {
              path: 'edit/:id',
              name: 'app.membresias.edit',
              component: () => import('../views/mains/AddMembership.vue'),
              beforeEnter:[mustBeLogin],
            }
          ]
        },
        {
          path: "profile",
          name: "app.profile",
          component: () => import("../views/mains/ProfileView.vue"),
          beforeEnter:[mustBeLogin],
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue'),
      beforeEnter:[mustBeLoggedOut]
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPasswordView.vue'),
      beforeEnter:[mustBeLoggedOut]
    }
  ]
})

export default router
