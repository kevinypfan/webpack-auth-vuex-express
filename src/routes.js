import Home from './components/Home.vue'
import Profile from './components/user/Profile.vue'
import Signup from './components/user/Signup.vue'
import Login from './components/user/Login.vue'
import Logout from './components/user/Logout.vue'

export const routes = [
  {path:'/', component: Home},
  {path: '/profile' , component: Profile, meta: { reqAuth: true }},
  {path: '/login' , component: Login},
  {path: '/signup' , component: Signup},
  {path: '/logout' , component: Logout},
  { path: '/*', redirect: '/login' }
]
