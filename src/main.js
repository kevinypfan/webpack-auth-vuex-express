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
      // var asd = window.localStorage.getItem("x-auth");
      // console.log(asd);
    },
  render: h => h(App)
})
