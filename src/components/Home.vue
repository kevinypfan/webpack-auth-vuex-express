<template>
  <div>
    <h1>Home Page</h1>
    <h1 v-if="">{{user.email}}</h1>
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
    }
  },
  watch: {
    user (value) {
      if (value == null || value == undefined) {
        this.$router.push('/login')
      }
    }
  },
  created () {
    var token = window.localStorage.getItem("x-auth");
    if (token !== null || token !== undefined) {
      this.$store.dispatch('getToken', token);
    }
  }
}
</script>

<style>
</style>
