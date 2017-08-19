<template lang="html">
  <pre>{{posts}}</pre>
</template>

<script>
export default {
  data () {
    return {
      posts: []
    }
  },
  created () {
    var token = window.localStorage.getItem('x-auth');
    this.$http.get('/myPosts',{headers: {"x-auth": token}}).then(posts => {
      this.posts = posts.body
    })
  }
}
</script>

<style lang="css">
</style>
