import Home from './components/Home.vue'
import Profile from './components/user/Profile.vue'
import Signup from './components/user/Signup.vue'
import Login from './components/user/Login.vue'

export const routes = [
  {path:'/', component: Home},
  {path: '/profile' , component: Profile, meta: { reqAuth: true }},
  {path: '/login' , component: Login},
  {path: '/signup' , component: Signup},
  { path: '/*', redirect: '/login' }
]
