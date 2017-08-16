<template>
  <div>
    <h1>Home Page</h1>
    <!-- <h1 v-if="">{{user.email}}</h1> -->
  </div>

</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    // user () {
    //   return this.$store.getters.getUser
    // },
    userIsAuthenticated () {
        return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
    }
  },
  watch: {
    userIsAuthenticated (value) {
      if (value) {
        this.$router.push('/');
      } else {
        this.$router.push('/login');
      }
    }
  },
  created () {
    var token = window.localStorage.getItem("x-auth");
    this.$store.dispatch('getToken', token);
    // var token = window.localStorage.getItem("x-auth");
    // if (token == null) {
    //   this.$router.push('/login');
    // }
  }
}
</script>

<style>
</style>
