import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: null
    },
    getters:{
        getUser (state) {
          return state.user
        }
    },
    mutations:{
        setUser (state, payload){
          state.user = payload
        }
    },
    actions:{
        //註冊
        signUserUp({commit}, payload){
          Vue.http.post('http://59.126.93.93:8000/users',payload).then((res)=>{

            console.log(res)
            commit('setUser', res.body.email);
            // let token = res.headers.map['x-auth'][0];
            // localStorage.setItem('x-auth', token);
          },(error)=>{

          })
          // commit('setUser', payload.email)
        },
        userLogin({commit}, payload){
          Vue.http.post('http://59.126.93.93:8000/login',payload).then((res)=>{

            console.log(res)
            commit('setUser', res.body.email);
            // let token = res.headers.map['x-auth'][0];
            // localStorage.setItem('x-auth', token);
          },(error)=>{

          })
        }
    }
})
