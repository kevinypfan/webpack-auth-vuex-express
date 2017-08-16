import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
Vue.use(VueResource);

import { store } from './store/store'
import { routes } from './routes'

Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    routes
});



new Vue({
  el: '#app',
    store,
    router,
    created(){
      var token = window.localStorage.getItem("x-auth");
      this.$store.dispatch('getToken', token ).then((res)=>{
        this.$router.push('/');
      }).catch(err=>{
        this.$router.push('/login');
      });
    },
  render: h => h(App)
})
