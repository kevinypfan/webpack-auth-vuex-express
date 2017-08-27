<template lang="html">
  <div>
    <app-post v-for="p in posts" :post="p"></app-post>
  </div>
</template>

<script>
import Posts from './posts.vue'
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
  },
  components: {
    appPost: Posts
  }
}
</script>

<style lang="css">
</style>
