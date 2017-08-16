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
          Vue.http.post('/users',payload).then((res)=>{

            console.log(res)
            commit('setUser', res.body);
            let token = res.headers.get('x-auth');
            localStorage.setItem('x-auth', token);
          },(error)=>{

          })
          // commit('setUser', payload.email)
        },
        userLogin({commit}, payload){
          Vue.http.post('/user/login',payload).then((res)=>{
            commit('setUser', res.body);
            let token = res.headers.get('x-auth');
            localStorage.setItem('x-auth', token);
          },(error)=>{

          })
        },
        userLogout ({commit},payload) {
          Vue.http.delete('/users/me/token',{'headers':{'x-auth': payload['x-auth'] }}).then((res)=>{
            console.log(payload);
            commit('setUser', null);
            localStorage.removeItem('x-auth');
          },(error)=>{
          });
        },
        getToken ({commit}, payload) {
          return new Promise((resolve, reject) => {
            Vue.http.get('/users/me', {'headers': {'x-auth': payload }}).then((res) => {
              commit('setUser', res.body);
              resolve();
            }).catch(()=>{
              reject();
            })
          })
        }
    }
})
