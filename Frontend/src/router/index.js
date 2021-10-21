import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Account from '../views/Account.vue'
import ModifyAccount from '../views/ModifyAccount.vue'
import DeleteAccount from '../views/DeleteAccount.vue'

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
    path: '/modify-account',
    name: 'ModifyAccount',
    component: ModifyAccount,
  },
  {
    path: '/delete-account',
    name: 'DeleteAccount',
    component: DeleteAccount
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
