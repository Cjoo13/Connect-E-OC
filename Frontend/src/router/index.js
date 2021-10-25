import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Account from '../views/Account.vue'
import ModifyAccount from '../views/ModifyAccount.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
  },
  {
    path: '/modify_account',
    name: 'ModifyAccount',
    component: ModifyAccount,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
