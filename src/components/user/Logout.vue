<template lang="html">
  <h1>Logout</h1>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('userLogout', {'x-auth': window.localStorage.getItem("x-auth")})
  },
  computed: {
    user(){
      return this.$store.getters.getUser
    }
  },
  watch: {
    user (value) {
      if (value == null || value == undefined) {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="css">
</style>
