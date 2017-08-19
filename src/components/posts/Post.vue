<template lang="html">
<div>
  <pre>{{posts}}</pre>
</div>
</template>

<script>
export default {
  data(){
    return {
      posts: []
    }
  },
  created () {
    var token = window.localStorage.getItem("x-auth");
    this.$http.get('/getAllPosts',{headers: {'x-auth': token}}).then(posts => {
      this.posts = posts.body
      console.log(posts)
    }).catch(e => {

    })
  }
}
</script>

<style lang="css">
</style>
