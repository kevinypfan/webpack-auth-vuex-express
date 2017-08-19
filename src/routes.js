import Home from './components/Home.vue'
import Profile from './components/user/Profile.vue'
import Signup from './components/user/Signup.vue'
import Login from './components/user/Login.vue'
import Logout from './components/user/Logout.vue'
import Post from './components/posts/Post.vue'
import Chat from './components/chat/Chat.vue'
import Personal from './components/personal/Personal.vue'
import NewPost from './components/newPost/NewPost.vue'


export const routes = [
  {
    path:'/',
    component: Home,
    name: 'home',
    meta: { requiresAuth: true },
    // beforeEnter: (to, from, next) => {
    //     var token = window.localStorage.getItem("x-auth");
    //     console.log('to=', to.fullPath, '| from=', from.fullPath,'| token=', token);
    //   if (!token) {
    //     next('/login')
    //   } else {
    //     next()
    //   }
    // },
    children: [
      {
        path: '',
        name: 'post',
        component: Post
      },
      {
        path: 'chat',
        name: 'chat',
        component: Chat
      },
      {
        path: 'personal',
        name: 'personal',
        component: Personal
      },
      {
        path: 'newpost',
        name: 'newpost',
        component: NewPost
      }
    ]
  },
  {path: '/login' , name: 'login', component: Login},
  {path: '/signup' , name: 'signup', component: Signup},
  {path: '/logout' , name: 'logout', component: Logout},
  { path: '/*', redirect: '/login'}
]
