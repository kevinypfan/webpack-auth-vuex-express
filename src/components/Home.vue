<template>
  <div>
    <h1>Home Page</h1>
    <!-- <h1 v-if="">{{user.email}}</h1> -->
    <img src="/public/image/logo.png" alt="">
    <pre>{{user}}</pre>
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    // userIsAuthenticated () {
    //     return this.$store.getters.userIsAuthenticated
    // }
  },
  watch: {
    // userIsAuthenticated () {
    //   if (this.userIsAuthenticated) {
    //     this.$router.push('/');
    //   } else {
    //     this.$router.push('/login');
    //   }
    // }
  },
  created () {
    var token = window.localStorage.getItem("x-auth");
    this.$store.dispatch('getToken', token ).then((res)=>{
      this.$router.push('/');
    }).catch(err=>{
      this.$router.push('/login');
    });
  }
}
</script>

<style>
  img {
    height: 300px;
    width: 300px;
  }
</style>
